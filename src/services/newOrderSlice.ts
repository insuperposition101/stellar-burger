//страница одного заказа, который открывается по прямомму url

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNewOrder = createAsyncThunk(
  'newOrder/createNewOrder',
  orderBurgerApi
);
export const getOrderNumber = createAsyncThunk(
  'orders/orderNumber',
  getOrderByNumberApi
);
export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
        state.error = undefined;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
