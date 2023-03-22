export enum SortItemEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

export type SortType = {
  name: string;
  sortProperty: SortItemEnum;
};
