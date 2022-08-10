import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import signInReducer from '../components/sign-in/signInSlice';
import SpaceSlice from '../components/space/SpaceSlice';

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    space: SpaceSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
