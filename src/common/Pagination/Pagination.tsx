import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationpropsType = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<PaginationpropsType> = ({ onChangePage, currentPage }) => {
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
    />
  );
};
