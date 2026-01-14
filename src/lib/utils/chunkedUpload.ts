const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB per chunk

export interface InitiateUploadResponse {
  success: boolean;
  data: {
    uploadId: string;
    key: string;
    chunkSize: number;
    presignedUrls: string[];
    totalParts: number;
  };
}

export interface UploadPart {
  partNumber: number;
  etag: string;
}

/**
 * Splits a file into chunks
 */
export const splitFileIntoChunks = (file: File): Blob[] => {
  const chunks: Blob[] = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + CHUNK_SIZE, file.size);
    chunks.push(file.slice(start, end));
    start = end;
  }

  return chunks;
};

/**
 * Uploads a single chunk to S3 using presigned URL
 */
export const uploadChunk = async (
  presignedUrl: string,
  chunk: Blob
): Promise<string> => {
  // Remove checksum parameters from URL if present (they're optional for presigned URLs)
  const url = new URL(presignedUrl);
  url.searchParams.delete('x-amz-checksum-crc32');
  url.searchParams.delete('x-amz-sdk-checksum-algorithm');
  const cleanUrl = url.toString();

  const response = await fetch(cleanUrl, {
    method: 'PUT',
    body: chunk,
    // Don't set Content-Type for multipart upload parts
    // The Content-Type is set during CreateMultipartUpload
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Failed to upload chunk: ${response.status} ${errorText}`);
  }

  // Extract ETag from response headers (remove quotes if present)
  const etag = response.headers.get('ETag') || response.headers.get('etag');
  if (!etag) {
    throw new Error('ETag not found in response');
  }

  // Remove quotes from ETag if present
  return etag.replace(/^"|"$/g, '');
};

/**
 * Uploads all chunks to S3
 */
export const uploadChunks = async (
  chunks: Blob[],
  presignedUrls: string[],
  onProgress?: (progress: number) => void
): Promise<UploadPart[]> => {
  const parts: UploadPart[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const etag = await uploadChunk(presignedUrls[i], chunks[i]);
    parts.push({
      partNumber: i + 1,
      etag: etag,
    });

    // Report progress
    if (onProgress) {
      const progress = ((i + 1) / chunks.length) * 100;
      onProgress(progress);
    }
  }

  return parts;
};
