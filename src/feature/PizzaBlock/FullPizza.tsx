import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{ imageUrl: string; title: string; price: number }>();
  useEffect(() => {
    axios.get(`https://6409e587d16b1f3ed6e069fe.mockapi.io/items/${id}`).then((res) => {
      setPizza(res.data);
    });
  }, []);

  if (!pizza) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="" />
      <h4>{pizza.price}</h4>
    </div>
  );
};
