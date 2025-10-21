import { createSlice } from '@reduxjs/toolkit';
import type { IUserFields } from '../../types';

type UserInitialState = {
  user: IUserFields | null;
  signInLoading: boolean;
  signInError: boolean;
  loginLoading: boolean;
  loginError: boolean;
};

const initialState: UserInitialState = {
  user: null,
  signInLoading: false,
  signInError: false,
  loginLoading: false,
  loginError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (buider) => {},
  selectors: {
    selectUser: (state) => state.user,
    selectUserSignInLoading: (state) => state.signInLoading,
    selectUserSignInError: (state) => state.signInError,
    selectUserLoginLoading: (state) => state.loginLoading,
    selectUserLoginError: (state) => state.loginError,
  },
});

export const userReducer = userSlice.reducer;
export const {
  selectUser,
  selectUserLoginError,
  selectUserLoginLoading,
  selectUserSignInError,
  selectUserSignInLoading,
} = userSlice.selectors;
