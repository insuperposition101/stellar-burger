import {
  ingredientsSlice,
  initialState,
  getIngredients
} from '../../services/ingredientsSlice';

import { mockIngredients } from '../../__mockData/ingredients';

describe('тестирование загрузки ингредиентов', () => {
  test('pending', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });
    expect(state.loading).toBe(true);
  });

  test('rejected', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: 'Test Error Message' }
    });
    expect(state.loading).toBe(false);
  });

  test('fulfilled', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: [mockIngredients[0], mockIngredients[2]]
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual([mockIngredients[0], mockIngredients[2]]);
  });
});
