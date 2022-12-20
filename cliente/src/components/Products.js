import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';

export default function Products({ products, handleClick }) {
  const navigate = useNavigate();
  const productElements = products.map((product, index) => {
    return (
      <li key={product.slug.current}>
        <div className='name'>{product.name}</div>
        <div className='price'>{product.price}</div>

        <LazyLoadImage
          effect='blur'
          width='400px'
          height='400px'
          src={product.imageUrl[0]}
          alt='product'
          placeholderSrc={product.imageUrl[0]}
          onClick={() => navigate(`/product/${product.slug.current}`)}
        />
        <button onClick={() => handleClick(product)}>Agregar</button>
      </li>
    );
  });
  return (
    <div>
      Products
      <ul>{productElements}</ul>
    </div>
  );
}
