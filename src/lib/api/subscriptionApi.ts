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
  prepareHeaders: (headers) => {
    const token = getAdminToken() || getUserToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
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

export interface CreateCheckoutRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateCheckoutResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subscription'],
  endpoints: (builder) => ({
    createCheckout: builder.mutation<CreateCheckoutResponse, CreateCheckoutRequest>({
      query: (data) => ({
        url: '/api/v1/subscription/create-checkout',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
} = subscriptionApi;
