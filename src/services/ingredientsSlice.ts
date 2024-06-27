import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface TIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
}

const initialState: TIngredientState = {
  ingredients: [],
  loading: false
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectorIngredientsStatus: (state: TIngredientState) => state.loading,
    selectorIngredients: (state: TIngredientState) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.ingredients = [];
      })
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { selectorIngredients } = ingredientsSlice.selectors;
