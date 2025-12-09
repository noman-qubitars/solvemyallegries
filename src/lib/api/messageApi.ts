import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAdminToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers, { endpoint }) => {
    const token = getAdminToken() || getUserToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (endpoint !== 'sendMessage') {
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

export interface Message {
  _id: string;
  userId: string;
  adminId?: string;
  messageType: 'text' | 'voice' | 'image' | 'document' | 'pdf';
  content?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  isRead?: boolean;
  sentBy: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageParams {
  messageType: 'text' | 'voice' | 'image' | 'document' | 'pdf';
  content?: string;
  file?: File;
  userId?: string;
}

export interface GetMessagesParams {
  userId?: string;
  isRead?: boolean;
  page?: number;
  limit?: number;
}

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getAllMessages: builder.query<{ success: boolean; data: Message[]; total: number; page: number; limit: number; totalPages: number }, GetMessagesParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.userId) queryParams.append('userId', params.userId);
        if (params?.isRead !== undefined) queryParams.append('isRead', params.isRead.toString());
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        const queryString = queryParams.toString();
        return `/api/messages${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Message'],
    }),
    getUserMessages: builder.query<{ success: boolean; data: Message[]; total: number }, string>({
      query: (userId) => `/api/messages/user/${userId}`,
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation<{ success: boolean; message: string; data: Message }, SendMessageParams>({
      query: (params) => {
        const formData = new FormData();
        formData.append('messageType', params.messageType);
        if (params.content) formData.append('content', params.content);
        if (params.file) formData.append('file', params.file);
        if (params.userId) formData.append('userId', params.userId);

        return {
          url: '/api/messages/send',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Message'],
    }),
    markAsRead: builder.mutation<{ success: boolean; message: string; modifiedCount: number }, { messageIds: string[] }>({
      query: (body) => ({
        url: '/api/messages/mark-read',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation<{ success: boolean; message: string }, string>({
      query: (messageId) => ({
        url: `/api/messages/${messageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
    deleteAllMessages: builder.mutation<{ success: boolean; message: string; deletedCount: number }, { userId: string }>({
      query: (body) => ({
        url: '/api/messages/chat/all',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
  useDeleteAllMessagesMutation,
} = messageApi;

