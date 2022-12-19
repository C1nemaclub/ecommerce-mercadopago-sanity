import React from 'react';

export default function Products({ products, handleClick }) {
  const productElements = products.map((product, index) => {
    return (
      <li key={product.slug.current}>
        <div className='name'>{product.name}</div>
        <div className='price'>{product.price}</div>
        <button onClick={() => handleClick(product)}>Agregar</button>
      </li>
    );
  });

  return (
    <div>
      Products
      <ul></ul>
      {productElements}
    </div>
  );
}
