import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import searchIcon from '../../assets/img/search_zoom_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
      dispatch(setSearchValue(str));
    }, 350),

    [],
  );
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    updateSearchValue(e.currentTarget.value);
  };
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="searchIcon" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder={'search pizza...'}
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clear_icon}
          src={deleteIcon}
          alt="deleteIcon"
        />
      )}
    </div>
  );
};
