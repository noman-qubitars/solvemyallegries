import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAdminToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers, { endpoint }) => {
    const token = getAdminToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (endpoint !== 'createVideo' && endpoint !== 'updateVideo') {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
  }
  
  return result;
};

export interface SessionVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  symptoms: string[];
  status: 'uploaded' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionVideoRequest {
  title: string;
  description?: string;
  symptoms?: string[];
  status?: 'uploaded' | 'draft';
  video: File;
}

export interface UpdateSessionVideoRequest {
  id: string;
  title?: string;
  description?: string;
  symptoms?: string[];
  status?: 'uploaded' | 'draft';
  video?: File;
}

export interface InitiateUploadRequest {
  filename: string;
  mimetype: string;
  totalSize: number;
}

export interface InitiateUploadResponse {
  success: boolean;
  message: string;
  data: {
    uploadId: string;
    key: string;
    chunkSize: number;
    presignedUrls: string[];
    totalParts: number;
  };
}

export interface CompleteUploadRequest {
  uploadId: string;
  key: string;
  parts: Array<{
    partNumber: number;
    etag: string;
  }>;
  title: string;
  description?: string;
  symptoms?: string[];
  status?: 'uploaded' | 'draft';
}

export interface CompleteUploadResponse {
  success: boolean;
  message: string;
  data: SessionVideo;
}

export const sessionVideoApi = createApi({
  reducerPath: 'sessionVideoApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SessionVideo'],
  endpoints: (builder) => ({
    getVideos: builder.query<{ success: boolean; data: SessionVideo[]; total: number }, { status?: 'uploaded' | 'draft' | 'published' }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) {
          const statusParam = params.status === 'published' ? 'uploaded' : params.status;
          queryParams.append('status', statusParam);
        }
        const queryString = queryParams.toString();
        return `/api/v1/session-videos${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['SessionVideo'],
    }),
    createVideo: builder.mutation<{ success: boolean; message: string; data: SessionVideo }, CreateSessionVideoRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.status) formData.append('status', body.status);
        if (body.symptoms && body.symptoms.length > 0) {
          formData.append('symptoms', JSON.stringify(body.symptoms));
        }
        formData.append('video', body.video);
        
        return {
          url: '/api/v1/session-videos',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['SessionVideo'],
    }),
    updateVideo: builder.mutation<{ success: boolean; message: string; data: SessionVideo }, UpdateSessionVideoRequest>({
      query: (body) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description !== undefined) formData.append('description', body.description);
        if (body.status) formData.append('status', body.status);
        if (body.symptoms !== undefined) {
          formData.append('symptoms', JSON.stringify(body.symptoms));
        }
        if (body.video) formData.append('video', body.video);
        
        return {
          url: `/api/v1/session-videos/${body.id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['SessionVideo'],
    }),
    deleteVideo: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/v1/session-videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SessionVideo'],
    }),
    initiateUpload: builder.mutation<InitiateUploadResponse, InitiateUploadRequest>({
      query: (body) => ({
        url: '/api/v1/session-videos/initiate-upload',
        method: 'POST',
        body,
      }),
    }),
    completeUpload: builder.mutation<CompleteUploadResponse, CompleteUploadRequest>({
      query: (body) => ({
        url: '/api/v1/session-videos/complete-upload',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SessionVideo'],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useInitiateUploadMutation,
  useCompleteUploadMutation,
} = sessionVideoApi;

