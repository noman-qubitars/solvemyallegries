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

export interface DailySessionAnswer {
  questionId: string;
  answer: string | number;
  question?: {
    questionId: string;
    questionText: string;
    questionType: string;
  };
}

export interface DailySession {
  _id: string;
  userId: string;
  date: string;
  answers: DailySessionAnswer[];
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetDailySessionsParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetSessionByDateParams {
  userId: string;
  date: string;
}

export const dailySessionApi = createApi({
  reducerPath: 'dailySessionApi',
  baseQuery,
  tagTypes: ['DailySession'],
  endpoints: (builder) => ({
    getDailySessionQuestions: builder.query({
      query: () => '/api/daily-session/questions',
    }),
    getDailySessions: builder.query<{ success: boolean; data: DailySession[]; total: number }, GetDailySessionsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.userId) queryParams.append('userId', params.userId);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        return `/api/daily-session?${queryParams.toString()}`;
      },
      providesTags: ['DailySession'],
    }),
    getSessionByDate: builder.query<{ success: boolean; data: DailySession }, GetSessionByDateParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        queryParams.append('userId', params.userId);
        queryParams.append('date', params.date);
        return `/api/daily-session/by-date?${queryParams.toString()}`;
      },
      providesTags: ['DailySession'],
    }),
  }),
});

export const {
  useGetDailySessionQuestionsQuery,
  useGetDailySessionsQuery,
  useGetSessionByDateQuery,
} = dailySessionApi;

