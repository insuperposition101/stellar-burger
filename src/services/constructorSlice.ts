import { createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';

export interface TConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        const item = { ...action.payload, id: state.ingredients.length };
        state.ingredients.push(item);
      }
    },
    removeIngredient: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const reducer = constructorSlice.reducer;
export const { addIngredient, removeIngredient, resetConstructor } =
  constructorSlice.actions;
