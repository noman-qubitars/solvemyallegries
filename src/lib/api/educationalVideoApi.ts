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
    // Don't set Content-Type for file uploads, let browser set it with boundary
    if (endpoint !== 'createVideo' && endpoint !== 'updateVideo') {
      headers.set('Content-Type', 'application/json');
    }
    headers.set('ngrok-skip-browser-warning', 'true');
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

export interface EducationalVideo {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: 'uploaded' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoRequest {
  title: string;
  description?: string;
  status?: 'uploaded' | 'draft';
  video: File;
}

export interface UpdateVideoRequest {
  id: string;
  title?: string;
  description?: string;
  status?: 'uploaded' | 'draft';
  video?: File;
}

export const educationalVideoApi = createApi({
  reducerPath: 'educationalVideoApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['EducationalVideo'],
  endpoints: (builder) => ({
    getVideos: builder.query<{ success: boolean; data: EducationalVideo[]; total: number }, { status?: 'uploaded' | 'draft' | 'published' }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.status) {
          // Map "published" to "uploaded" for backend compatibility
          const statusParam = params.status === 'published' ? 'uploaded' : params.status;
          queryParams.append('status', statusParam);
        }
        const queryString = queryParams.toString();
        return `/api/educational-videos${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['EducationalVideo'],
    }),
    createVideo: builder.mutation<{ success: boolean; message: string; data: EducationalVideo }, CreateVideoRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.status) formData.append('status', body.status);
        formData.append('video', body.video);
        
        return {
          url: '/api/educational-videos',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['EducationalVideo'],
    }),
    updateVideo: builder.mutation<{ success: boolean; message: string; data: EducationalVideo }, UpdateVideoRequest>({
      query: (body) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description !== undefined) formData.append('description', body.description);
        if (body.status) formData.append('status', body.status);
        if (body.video) formData.append('video', body.video);
        
        return {
          url: `/api/educational-videos/${body.id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['EducationalVideo'],
    }),
    deleteVideo: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/educational-videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EducationalVideo'],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = educationalVideoApi;