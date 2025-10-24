import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ICocktailMutation, IValidationError } from '../../types';
import { axiosApi } from '../../axiosApi';
import { isAxiosError } from 'axios';

export const submitCocktailsThunk = createAsyncThunk<void, ICocktailMutation, { rejectValue: IValidationError }>(
  'cocktails/submitCocktailsThunk',
  async (cocktailForm, { rejectWithValue }) => {
    try {
      const dataForm = new FormData();
      const keys = Object.keys(cocktailForm) as (keyof ICocktailMutation)[];
      keys.forEach((key) => {
        const value = cocktailForm[key];
        if (key === 'ingredients' && Array.isArray(value) && value.length > 0) {
          const ingredientsStringed = JSON.stringify(value);
          dataForm.append(key, ingredientsStringed);
        } else if (key === 'image' && value instanceof File) {
          dataForm.append(key, value);
        } else if (typeof value === 'string' && value.trim() !== '') {
          dataForm.append(key, value);
        }
      });
      await axiosApi.post('/cocktails', dataForm);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
