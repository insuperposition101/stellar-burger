import {
  getFeeds,
  getUserOrders,
  feedSlice,
  initialState
} from '../../services/feedSlice';

import { mockOrders, mockOrdersTotal } from '../../__mockData/orders';

describe('тестирование редьюсера feedSlice', () => {
  describe('отображение ленты заказов', () => {
    test('pending', () => {
      const state = feedSlice.reducer(initialState, {
        type: getFeeds.pending.type
      });
      expect(state.isLoading).toBe(true);
    });

    test('fulfilled', () => {
      const state = feedSlice.reducer(initialState, {
        type: getFeeds.fulfilled.type,
        payload: {
          orders: mockOrdersTotal.orders,
          total: 3,
          totalToday: 3
        }
      });
      expect(state.orders).toEqual(mockOrdersTotal.orders);
      expect(state.total).toEqual(3);
      expect(state.totalToday).toEqual(3);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('отображение заказов пользователя', () => {
    test('fulfilled', () => {
      const state = feedSlice.reducer(initialState, {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      });
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    test('pending', () => {
      const state = feedSlice.reducer(initialState, {
        type: getUserOrders.pending.type
      });
      expect(state.isLoading).toBe(true);
    });

    test('rejected', () => {
      const state = feedSlice.reducer(initialState, {
        type: getUserOrders.rejected.type
      });
      expect(state.isLoading).toBe(false);
    });
  });
});
