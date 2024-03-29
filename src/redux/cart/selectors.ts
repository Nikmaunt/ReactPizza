import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((el) => el.id === id);
