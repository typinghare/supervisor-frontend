import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import signInReducer from './slice/signInSlice';
import SpaceSlice from './slice/SpaceSlice';
import TaskSlice from './slice/TaskSlice';

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    space: SpaceSlice,
    task: TaskSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
