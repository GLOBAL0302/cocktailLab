import { createSlice } from '@reduxjs/toolkit';
import type { ICocktail, IValidationError } from '../../types';
import { fetchCocktailsThunk, submitCocktailsThunk } from './cocktailThunk';

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

    builder
      .addCase(fetchCocktailsThunk.pending, (state) => {
        state.cocktailsLoading = true;
      })
      .addCase(fetchCocktailsThunk.fulfilled, (state, { payload }) => {
        state.cocktailsLoading = false;
        state.cocktails = payload;
      })
      .addCase(fetchCocktailsThunk.rejected, (state) => {
        state.cocktailsLoading = false;
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
export const { unSetCoktailSubmittingError } = cocktailsSlice.actions;
export const { selectCocktails, selectCocktailsLoading, selectCocktailsSubmitting, selectCocktailsSubmittingError } =
  cocktailsSlice.selectors;
