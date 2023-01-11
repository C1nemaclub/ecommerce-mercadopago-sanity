import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/productCard/products.scss';
import { FaCartPlus } from 'react-icons/fa';

export default function Products({ products, handleClick }) {
  const navigate = useNavigate();
  const productElements = products.map((product, index) => {
    return (
      <div className='card' key={product.slug.current}>
        <div className='img-container'>
          <LazyLoadImage
            effect='blur'
            src={product.imageUrl[0]}
            alt='product'
            class='product-image'
            placeholderSrc={product.imageUrl[0]}
            onClick={() => navigate(`/product/${product.slug.current}`)}
          />
        </div>
        <div className='card-footer'>
          <div className='left'>
            <div className='name'>{product.name}</div>
            <div className='price'>$ {product.price}</div>
          </div>
          <FaCartPlus
            onClick={() => handleClick(product)}
            className='icon card-icon'
          />
        </div>
      </div>
    );
  });
  return productElements;
}
