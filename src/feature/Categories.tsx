import React, { useState } from 'react';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onClickCategory = (value: number) => {
    setActiveIndex(value);
  };

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
