import React, { useContext, useEffect, useRef, useState } from 'react';
import { Categories } from '../feature/Categories';
import { Sort, sortList } from '../feature/Sort';
import { SkeletonLoader } from '../feature/PizzaBlock/skeletonLoader';
import PizzaBlock from '../feature/PizzaBlock/PizzaBlock';
import { Pagination } from '../common/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filterSclice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const categoryId = useSelector<RootState>((state) => state.filter.categoryId);
  const sort = useSelector<RootState>((state) => state.filter.sort);
  const currentPage = useSelector<RootState>((state) => state.filter.currentPage);
  const sortType = useSelector<RootState>((state) => state.filter.sort.sortProperty);
  const [items, setItems] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `search=${searchValue}` : '';
    // @ts-ignore
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    axios
      .get(
        `https://6409e587d16b1f3ed6e069fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&search=${searchValue}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
      fetchPizzas();
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

  const pizzas = items
    // .filter((el) => (el.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false))
    .map((el) => <PizzaBlock key={el.id} {...el} />);
  const skeletons = [...new Array(6)].map((_, index) => <SkeletonLoader key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
