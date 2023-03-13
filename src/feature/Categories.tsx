import React, { useState } from 'react';

export const Categories = ({ categoryId, onChangeCategory }: any) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  console.log(categoryId, 'Categories');
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={1 === index ? 'active' : ''}>
            {el}
            <>{console.log(categoryId === index)}</>
          </li>
        ))}
      </ul>
    </div>
  );
};
