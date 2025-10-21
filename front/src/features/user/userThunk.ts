import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IUserFields, IUserLoginMutation, IUserRegisterMuation, IValidationError } from '../../types';
import { axiosApi } from '../../axiosApi';
import { isAxiosError } from 'axios';

export const signInThunk = createAsyncThunk<IUserFields, IUserRegisterMuation, { rejectValue: IValidationError }>(
  'user/signInThunk',
  async (registerForm, { rejectWithValue }) => {
    try {
      const dataForm = new FormData();
      const keys = Object.keys(registerForm) as (keyof IUserRegisterMuation)[];
      keys.forEach((key) => {
        const value = registerForm[key];
        if (value) {
          dataForm.append(key, value);
        }
      });
      const { data } = await axiosApi.post('/users', dataForm);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data.error);
      }
      throw e;
    }
  },
);

export const logInThunk = createAsyncThunk<IUserFields, IUserLoginMutation>('user/logInThunk', async (LoginForm) => {
  const { data } = await axiosApi.post('/users/session', LoginForm);
  return data;
});

export const logOutThunk = createAsyncThunk('user/logOutThunk', async () => {
  await axiosApi.delete('/users/session');
});
