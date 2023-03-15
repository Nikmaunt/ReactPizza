import React, { useContext, useEffect, useRef, useState } from 'react';
import { Categories } from '../feature/Categories';
import { Sort, sortList } from '../feature/Sort';
import { SkeletonLoader } from '../feature/PizzaBlock/skeletonLoader';
import PizzaBlock from '../feature/PizzaBlock/PizzaBlock';
import { Pagination } from '../common/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
  sortSelector,
} from '../redux/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizza, pizzaDataSelector } from '../redux/pizzasSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  // @ts-ignore
  const { items, status } = useSelector<RootState>(pizzaDataSelector);
  const sort = useSelector<RootState>(sortSelector);
  // @ts-ignore
  const { sortType, categoryId, currentPage, searchValue } = useSelector<RootState>(filterSelector);
  console.log('SORT', sort);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizza = async () => {
    const search = searchValue ? `search=${searchValue}` : '';
    // @ts-ignore
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    dispatch(
      // @ts-ignore
      fetchPizza({
        currentPage,
        category,
        sortType,
        searchValue,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = sortList.find((el) => el.sortProperty === params.sortType);
      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizza();
    }
    isSearch.current = false;
  }, [searchValue, currentPage, sort, categoryId]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortType,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true },
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, currentPage, sort, categoryId]);

  // @ts-ignore
  const pizzas = items.map((el) => (
    <Link key={el.id} to={`/pizza/${el.id}`}>
      {' '}
      <PizzaBlock {...el} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <SkeletonLoader key={index} />);
  console.log(pizzas, 'PIZA');
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort} />
      </div>

      <h2 className="content__title">All</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Something went wrong </h2>
          <p>Please, try again</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
