import { CartItemType } from '../redux/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, el) => el.price * el.count + sum, 0);
};
