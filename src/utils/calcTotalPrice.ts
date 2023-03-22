import {} from '../redux/cart/cartSlice';
import { CartItemType } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, el) => el.price * el.count + sum, 0);
};
