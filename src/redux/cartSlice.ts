import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface CartState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
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
      state.totalPrice = state.items.reduce((sum: any, el: any) => el.price * el.count + sum, 0);
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

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((el: any) => el.id === id);

// Action creators are generated for each case reducer function
export const { addProduct, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
