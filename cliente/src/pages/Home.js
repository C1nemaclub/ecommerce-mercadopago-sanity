import { useState, useEffect } from 'react';
import { useStateContext } from '../context/stateContext';
import Products from '../components/Products.js';
import Banner from '../components/Banner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Home() {
  const { products, addToCart, isLoading } = useStateContext();

  function handleClick(product) {
    addToCart(product);
  }

  //   if (isLoading) {
  //     return <h2>Loading...</h2>;
  //   }

  return (
    <div>
      <h2>Home</h2>
      <LazyLoadImage
        effect='blur'
        src={
          'https://images.unsplash.com/photo-1671418193953-9402c71d612d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        }
        width='400px'
        height='400px'
      />
      <Products products={products} handleClick={handleClick} />
      <Banner />
    </div>
  );
}
