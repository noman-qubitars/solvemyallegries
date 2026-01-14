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
  chunk: Blob,
  mimetype: string
): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: chunk,
    headers: {
      'Content-Type': mimetype,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload chunk: ${response.statusText}`);
  }

  // Extract ETag from response headers
  const etag = response.headers.get('ETag');
  if (!etag) {
    throw new Error('ETag not found in response');
  }

  return etag;
};

/**
 * Uploads all chunks to S3
 */
export const uploadChunks = async (
  chunks: Blob[],
  presignedUrls: string[],
  mimetype: string,
  onProgress?: (progress: number) => void
): Promise<UploadPart[]> => {
  const parts: UploadPart[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const etag = await uploadChunk(presignedUrls[i], chunks[i], mimetype);
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

