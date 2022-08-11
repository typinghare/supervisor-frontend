import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SignInState = {
  alertShow: boolean,
  username: string,
  password: string
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: { alertShow: false, username: '', password: '' },
  reducers: {
    alertShow: (state: SignInState) => {
      state.alertShow = true;
    },
    alertHidden: (state: SignInState) => {
      state.alertShow = false;
    },
    setUsername:(state: SignInState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state: SignInState, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
});

export const { alertShow, alertHidden, setUsername, setPassword } = signInSlice.actions;

export const selectAlertShow = (state: RootState) => state.signIn.alertShow;
export const selectUsername = (state: RootState) => state.signIn.username;
export const selectPassword = (state: RootState) => state.signIn.password;

export default signInSlice.reducer;