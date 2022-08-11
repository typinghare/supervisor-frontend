import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SpaceState = {
  tab: string;
}

export const spaceSlice = createSlice({
  name: 'space',
  initialState: { tab: 'worklist' },
  reducers: {
    changeSpaceTab: (state: SpaceState, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
});

export const {changeSpaceTab} = spaceSlice.actions;

export const selectSpaceTab = (state: RootState) => state.space.tab;

export default spaceSlice.reducer;