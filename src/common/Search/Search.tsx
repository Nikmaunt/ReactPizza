import React, { useContext } from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_zoom_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import { SearchContext } from '../../App';

export const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="searchIcon" />
      <input
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.currentTarget.value)}
        className={styles.input}
        type="text"
        placeholder={'search pizza...'}
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.clear_icon}
          src={deleteIcon}
          alt="deleteIcon"
        />
      )}
    </div>
  );
};
