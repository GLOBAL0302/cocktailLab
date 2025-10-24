import { createSlice } from '@reduxjs/toolkit';
import type { ICocktail, IValidationError } from '../../types';
import { submitCocktailsThunk } from './cocktailThunk';

interface ICocktailSliceInitialState {
  cocktails: ICocktail[];
  cocktailsLoading: boolean;
  cocktailsSubmitting: boolean;
  cocktailsSubmittingError: IValidationError | null;
}

const initialState: ICocktailSliceInitialState = {
  cocktails: [],
  cocktailsLoading: false,
  cocktailsSubmitting: false,
  cocktailsSubmittingError: null,
};

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    unSetCoktailSubmittingError: (state) => {
      state.cocktailsSubmittingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCocktailsThunk.pending, (state) => {
        state.cocktailsSubmitting = true;
      })
      .addCase(submitCocktailsThunk.fulfilled, (state) => {
        state.cocktailsSubmitting = false;
      })
      .addCase(submitCocktailsThunk.rejected, (state, { payload }) => {
        state.cocktailsSubmitting = false;
        state.cocktailsSubmittingError = payload || null;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectCocktailsLoading: (state) => state.cocktailsLoading,
    selectCocktailsSubmitting: (state) => state.cocktailsSubmitting,
    selectCocktailsSubmittingError: (state) => state.cocktailsSubmittingError,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const { selectCocktails, selectCocktailsLoading, selectCocktailsSubmitting, selectCocktailsSubmittingError } =
  cocktailsSlice.selectors;
