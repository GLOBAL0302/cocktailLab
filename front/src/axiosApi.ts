import axios, { AxiosHeaders } from 'axios';
import type { Rootstate } from './app/store';
import type { Store } from '@reduxjs/toolkit';
export const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const interceptor = (store: Store<Rootstate>) => {
  axiosApi.interceptors.request.use(
    function (config) {
      const token = store.getState().user.user?.token;
      const headers = config.headers as AxiosHeaders;
      headers.set('Authorization', token);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};
