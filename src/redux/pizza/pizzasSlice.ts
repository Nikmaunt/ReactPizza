import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { PizzaBlockType } from '../../feature/PizzaBlock/PizzaBlock';
import { PizzaState, Status } from './types';

export const fetchPizza = createAsyncThunk<PizzaBlockType[], Record<string, string>>(
  'pizza/fetchPizzaStatus',
  async (params, thunkAPI) => {
    const { currentPage, category, sortBy, searchValue } = params;
    const { data } = await axios.get<PizzaBlockType[]>(
      `https://6409e587d16b1f3ed6e069fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&search=${searchValue}`,
    );
    thunkAPI.dispatch(setItems(data));
    return data;
  },
);

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaBlockType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
