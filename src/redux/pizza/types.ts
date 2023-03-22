import { PizzaBlockType } from '../../feature/PizzaBlock/PizzaBlock';

export interface PizzaState {
  items: PizzaBlockType[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
