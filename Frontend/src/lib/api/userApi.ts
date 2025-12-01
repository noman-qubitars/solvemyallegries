import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAdminToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers) => {
    const token = getAdminToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export interface User {
  id: string;
  mongoId: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate: string;
  status: string;
  activity: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<{ success: boolean; data: User[] }, void>({
      query: () => '/api/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query<{ success: boolean; data: User }, string>({
      query: (userId) => `/api/users/${userId}`,
      providesTags: ['User'],
    }),
    toggleUserStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/api/users/${userId}/block`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useToggleUserStatusMutation } = userApi;