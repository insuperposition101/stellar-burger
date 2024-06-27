import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from '../services/ingredientsSlice';
import { userSlice } from '../services/userSlice';
import { newOrderSlice } from '../services/newOrderSlice';
import { constructorSlice } from '../services/constructorSlice';
import { feedSlice } from '../services/feedSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer
});
// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
