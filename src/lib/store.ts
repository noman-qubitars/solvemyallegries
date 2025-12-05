import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import { dailySessionApi } from './api/dailySessionApi';
import { messageApi } from './api/messageApi';
import { educationalVideoApi } from './api/educationalVideoApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [dailySessionApi.reducerPath]: dailySessionApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [educationalVideoApi.reducerPath]: educationalVideoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      dailySessionApi.middleware,
      messageApi.middleware,
      educationalVideoApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;