import React, { useCallback, useEffect, useRef } from 'react';
import { Categories } from '../feature/Categories';
import { Sort } from '../feature/Sort';
import { SkeletonLoader } from '../feature/PizzaBlock/skeletonLoader';
import PizzaBlock from '../feature/PizzaBlock/PizzaBlock';
import { Pagination } from '../common/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizza } from '../redux/pizza/pizzasSlice';
import { filterSelector } from '../redux/filter/selectors';
import { pizzaDataSelector } from '../redux/pizza/selectors';
import { SortType } from '../redux/filter/types';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(pizzaDataSelector);
  const { sort, categoryId, currentPage, searchValue } = useSelector(filterSelector);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizza = async () => {
    const category = categoryId > 0 ? String(categoryId) : '';
    const sortBy = sort.sortProperty;
    dispatch(
      fetchPizza({
        currentPage: String(currentPage),
        category,
        sortBy,
        searchValue,
      }),
    );
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     console.log(params, 'PARAMS');
  //     const sort = sortList.find((el) => el.sortProperty === params.sortBy);
  //     // @ts-ignore
  //     dispatch(setFilters({ ...params, sort }));
  //   }
  //   isSearch.current = true;
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {
  //     getPizza();
  //   }
  //   isSearch.current = false;
  // }, [searchValue, currentPage, sort, categoryId]);

  useEffect(() => {
    getPizza();
  }, [searchValue, currentPage, sort, categoryId]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify(
  //       {
  //         sortType,
  //         categoryId,
  //         currentPage,
  //       },
  //       { addQueryPrefix: true },
  //     );
  //     navigate(`${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [searchValue, currentPage, sort, categoryId]);

  const pizzas = items.map((el: any) => <PizzaBlock key={el.id} {...el} />);
  const skeletons = [...new Array(6)].map((_, index) => <SkeletonLoader key={index} />);
  console.log(pizzas, 'PIZA');

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort as SortType} />
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
