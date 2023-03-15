import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params, thunkAPI) => {
  // @ts-ignore
  const { currentPage, category, sortType, searchValue } = params;
  console.log(params);
  const { data } = await axios.get(
    `https://6409e587d16b1f3ed6e069fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&search=${searchValue}`,
  );

  thunkAPI.dispatch(setItems(data));
  return data;
});

export interface PizzaState {
  items: any;
  status: string;
}

const initialState: PizzaState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const pizzaDataSelector = (state: any) => state.pizza;

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
