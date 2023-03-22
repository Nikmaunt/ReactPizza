import React, { Suspense } from 'react';
import './App.css';
import './scss/app.scss';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { FullPizza } from './feature/PizzaBlock/FullPizza';
import { MainLayout } from './layouts/mainLayout';
import { NotFound } from './pages/NotFound';

const Cart = React.lazy(() => import('./pages/Cart'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="pizza/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
};
