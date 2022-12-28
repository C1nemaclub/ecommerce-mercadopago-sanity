import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context/stateContext';

export default function ProductPage() {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const { getSingleProduct, isLoading, currentProduct, products } =
    useStateContext();

  useEffect(() => {
    getSingleProduct(slug);
  }, [slug]);

  if (isLoading) {
    return 'Loading...';
  }
  return (
    <div>
      {currentProduct && currentProduct.name}
      <div>Popular</div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.slug.current}>
              {product.name}
              {product.details}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
