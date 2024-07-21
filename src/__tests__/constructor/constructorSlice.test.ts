import {
  initialState,
  reducer,
  addIngredient,
  removeIngredient,
  resetConstructor
} from '../../services/constructorSlice';

import {
  burgerPlusBun,
  burgerPlusMain,
  burgerMinusMain,
  mockBurger
} from '../../__mockData/constructor';

const uuid = require('uuid');

describe('Конструктор бургера', () => {
  const addId = (object: any) => {
    object.id;
    return object;
  };

  const removeId = (object: any) => {
    const { id, ...rest } = object;
    return rest;
  };
  test('Добавить булку', () => {
    const bunToEqual = { ...mockBurger.bun, id: uuid.v4() };
    const newState = reducer({ ...initialState }, addIngredient(bunToEqual));

    const newStateBun = addId(newState.bun);

    const expectedBun = addId(burgerPlusBun.bun);

    expect(removeId(newStateBun)).toEqual(removeId(expectedBun));
  });

  test('Добавить ингредиент', () => {
    const mainToEqual = { ...mockBurger.ingredients[0], id: uuid.v4() };
    const newState = reducer({ ...initialState }, addIngredient(mainToEqual));

    const newStateMain = addId(newState.ingredients[0]);

    const expectedMain = addId(burgerPlusMain.ingredients[0]);

    expect(removeId(newStateMain)).toEqual(removeId(expectedMain));
  });

  test('Удалить ингредиент', () => {
    const newState = reducer(
      mockBurger,
      removeIngredient(mockBurger.ingredients[1])
    );
    expect(newState).toEqual(burgerMinusMain);
  });

  test('Сброс конструктора', () => {
    const newState = reducer(mockBurger, resetConstructor());
    expect(newState).toEqual(initialState);
  });
});
