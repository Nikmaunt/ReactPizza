import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  totalPrice: number;
  items: any;
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addProduct: (state, action: PayloadAction<any>) => {
    //   // @ts-ignore
    //   state.items.push(action.payload);
    //
    //   state.totalPrice = state.items.reduce((sum: any, el: any) => el.price + sum, 0);
    // },
    addProduct: (state, action: PayloadAction<any>) => {
      const findItem = state.items.find((el: any) => el.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum: any, el: any) => el.price + sum, 0);
    },
    removeItem: (state, action: PayloadAction<any>) => {
      // @ts-ignore
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    clearItem: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
