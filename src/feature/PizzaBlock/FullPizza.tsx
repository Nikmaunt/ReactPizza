import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default FullPizza;
