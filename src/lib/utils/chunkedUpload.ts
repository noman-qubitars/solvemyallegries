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
  // Use the presigned URL exactly as provided - don't modify it
  // The URL is signed and any modification will break the signature
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: chunk,
    // Don't set any headers - the presigned URL handles authentication
    // Content-Type is set during CreateMultipartUpload, not on individual parts
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
 * Uploads all chunks to S3 sequentially
 * (kept for compatibility, but for large files prefer uploadChunksParallel)
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

    if (onProgress) {
      const progress = ((i + 1) / chunks.length) * 100;
      onProgress(progress);
    }
  }

  return parts;
};

/**
 * Uploads chunks to S3 in parallel with a concurrency limit.
 * This dramatically reduces total upload time for large videos.
 */
export const uploadChunksParallel = async (
  chunks: Blob[],
  presignedUrls: string[],
  onProgress?: (progress: number) => void,
  concurrency: number = 5
): Promise<UploadPart[]> => {
  const total = chunks.length;
  const results: UploadPart[] = new Array(total);
  let completed = 0;
  let currentIndex = 0;

  const runNext = async (): Promise<void> => {
    const index = currentIndex;
    if (index >= total) return;
    currentIndex += 1;

    const etag = await uploadChunk(presignedUrls[index], chunks[index]);
    results[index] = {
      partNumber: index + 1,
      etag,
    };

    completed += 1;
    if (onProgress) {
      const progress = (completed / total) * 100;
      onProgress(progress);
    }

    // Start next upload in this worker
    if (currentIndex < total) {
      await runNext();
    }
  };

  const workers = [];
  const workerCount = Math.min(concurrency, total);
  for (let i = 0; i < workerCount; i++) {
    workers.push(runNext());
  }

  await Promise.all(workers);

  // Ensure parts are ordered by partNumber
  return results.slice().sort((a, b) => a.partNumber - b.partNumber);
};

