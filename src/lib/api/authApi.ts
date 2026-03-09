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
  const result = await baseQuery(args, api, extraOptions);

  // Only perform automatic sign-out / redirect for authenticated requests,
  // not for the initial sign-in mutation where we want to show error toasts.
  const hasStoredToken = typeof window !== 'undefined' && (getAdminToken() || getUserToken());

  const isSignInRequest =
    typeof args === 'object' &&
    args !== null &&
    'url' in args &&
    (args as { url?: string }).url === '/api/v1/auth/signin';

  if (result.error && result.error.status === 401 && hasStoredToken && !isSignInRequest) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
  }

  return result;
};

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  token: string;
  email: string;
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface OtpRequest {
  email: string;
  code: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/api/v1/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<OtpResponse, OtpRequest>({
      query: (data) => ({
        url: '/api/v1/auth/otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (data) => ({
        url: '/api/v1/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: '/api/v1/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
} = authApi;
