import React, { useState } from 'react';

type CategoriesProps = {
  categoryId?: any;
  onChangeCategory: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({ categoryId, onChangeCategory }: any) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
