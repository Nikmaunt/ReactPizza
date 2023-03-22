import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLocalstorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartItemType, CartState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find((el: any) => el.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((el: any) => el.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
