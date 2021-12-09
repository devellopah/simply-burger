import orderSlice from './../store/reducers/orderSlice';
import builderSlice from './../store/reducers/builderSlice';
import authSlice from './../store/reducers/authSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    builder: builderSlice,
    order: orderSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
