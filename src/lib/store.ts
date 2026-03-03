import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import { dailySessionApi } from './api/dailySessionApi';
import { messageApi } from './api/messageApi';
import { educationalVideoApi } from './api/educationalVideoApi';
import { sessionVideoApi } from './api/sessionVideoApi';
import { authApi } from './api/authApi';
import { subscriptionApi } from './api/subscriptionApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [dailySessionApi.reducerPath]: dailySessionApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [educationalVideoApi.reducerPath]: educationalVideoApi.reducer,
    [sessionVideoApi.reducerPath]: sessionVideoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      subscriptionApi.middleware,
      authApi.middleware,
      userApi.middleware,
      dailySessionApi.middleware,
      messageApi.middleware,
      educationalVideoApi.middleware,
      sessionVideoApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;