import React, { useState } from 'react';
import './App.css';
import { Header } from './common/Header';
import './scss/app.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

export const SearchContext = React.createContext<any>('');

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
