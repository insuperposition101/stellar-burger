import {
  createNewOrder,
  newOrderSlice,
  initialState,
  resetOrder,
  getOrderNumber
} from '../../services/newOrderSlice';

import { configureStore } from '@reduxjs/toolkit';

import { mockOrders } from '../../__mockData/orders';

describe('тестирование редьюсера newOrderSlice', () => {
  describe('resetOrder', () => {
    const store = configureStore({
      reducer: { orderModalData: newOrderSlice.reducer },
      preloadedState: {
        orderModalData: {
          orderRequest: false,
          orderModalData: mockOrders[0].orders[0],
          error: undefined
        }
      }
    });

    test('сброс данных заказа', () => {
      const state = newOrderSlice.reducer(
        store.getState().orderModalData,
        resetOrder()
      );

      const { orderModalData } = state;
      expect(orderModalData).toBeNull();
    });
  });

  describe('оформление заказа', () => {
    test('fulfilled', () => {
      const state = newOrderSlice.reducer(initialState, {
        type: createNewOrder.fulfilled.type,
        payload: { order: mockOrders[0] }
      });
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBe(mockOrders[0]);
      expect(state.error).toBeUndefined();
    });

    test('rejected', () => {
      const state = newOrderSlice.reducer(initialState, {
        type: createNewOrder.rejected.type
      });
      expect(state.orderRequest).toBe(false);
    });

    test('pending', () => {
      const state = newOrderSlice.reducer(initialState, {
        type: createNewOrder.pending.type
      });
      expect(state.orderRequest).toBe(true);
    });
  });
});

describe('получение информации по номеру заказа', () => {
  test('fulfilled', () => {
    const state = newOrderSlice.reducer(initialState, {
      type: getOrderNumber.fulfilled.type,
      payload: { orders: [mockOrders[0].orders[0]._id] }
    });
    expect(state.orderModalData).toBe(mockOrders[0].orders[0]._id);
    expect(state.error).toBeUndefined();
  });
});
