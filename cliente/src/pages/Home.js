import { useState, useEffect } from 'react';
import { useStateContext } from '../context/stateContext';
import Products from '../components/Products.js';
import Banner from '../components/Banner';
import '../styles/products/productsLayout.scss';

export default function Home() {
  const { products, addToCart, isLoading } = useStateContext();

  function handleClick(product) {
    addToCart(product);
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <section className='section banner-section'>
        <Banner />
      </section>
      <section className='section products-section'>
        <h2>Best Selling Products</h2>
        <div className='product-grid'>
          <Products products={products} handleClick={handleClick} />
        </div>
      </section>
    </>
  );
}
