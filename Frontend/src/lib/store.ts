import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import { dailySessionApi } from './api/dailySessionApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [dailySessionApi.reducerPath]: dailySessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, dailySessionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;