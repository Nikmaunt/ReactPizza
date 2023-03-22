import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (id: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    useWhyDidYouUpdate('Categories', { categoryId, onChangeCategory });
    return (
      <div className="categories">
        <ul>
          {categories.map((el, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {el}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
