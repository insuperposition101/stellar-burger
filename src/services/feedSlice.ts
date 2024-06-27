import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk('orders/ofUser', getOrdersApi);
export const getFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
        state.isLoading = false;
      });
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
    //   .addCase(getOrderByNumber.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getOrderByNumber.fulfilled, (state, action) => {
    //     state.previewOrder = action.payload[0];
    //     state.isLoading = false;
    //   });
  }
});

export const { getFeedOrders, getFeedState } = feedSlice.selectors;
