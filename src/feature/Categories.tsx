import React, { useState } from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (id: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export const Categories: React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
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
};
