import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Pagination = ({ onChangePage, currentPage }: any) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null || undefined}
    />
  );
};
