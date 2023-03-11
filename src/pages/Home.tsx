import React, { useContext, useEffect, useState } from 'react';
import { Categories } from '../feature/Categories';
import { Sort } from '../feature/Sort';
import { SkeletonLoader } from '../feature/PizzaBlock/skeletonLoader';
import PizzaBlock from '../feature/PizzaBlock/PizzaBlock';
import { Pagination } from '../common/Pagination/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const [items, setItems] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<number>(0);
  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `search=${searchValue}` : '';

    fetch(`https://6409e587d16b1f3ed6e069fe.mockapi.io/items?page=${currentPage}&limit=4&${search}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [searchValue, currentPage]);

  // const handlePageClick = (event: any) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //   setItemOffset(newOffset);
  // };
  const pizzas = items
    // .filter((el) => (el.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false))
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletons = [...new Array(6)].map((_, index) => <SkeletonLoader key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        onChangePage={(number: number) => {
          setCurrentPage(number);
        }}
      />
    </div>
  );
};
