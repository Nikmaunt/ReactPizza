import React, { useState } from 'react';
import './App.css';
import { Header } from './common/Header';
import './scss/app.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { FullPizza } from './feature/PizzaBlock/FullPizza';
import { MainLayout } from './layouts/mainLayout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
};
