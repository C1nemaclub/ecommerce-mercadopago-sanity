import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context/stateContext';
import '../styles/singleProductPage/singleProductPage.scss';

export default function ProductPage() {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const { getSingleProduct, isLoading, currentProduct, products } =
    useStateContext();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    getSingleProduct(slug);
  }, [slug]);

  if (isLoading) {
    return 'Loading...';
  }
  return (
    <div>
      <section class='section single-product-section'>
        {currentProduct && (
          <div className='single-product-card'>
            <div className='left'>
              <div className='img-container'>
                <img src={currentProduct.imageUrl[index]} alt='' />
              </div>
              <div className='preview-images'>
                {currentProduct.imageUrl.map((image, index) => {
                  return (
                    <img
                      src={image}
                      alt='preview'
                      key={index}
                      class='image-preview'
                      onMouseEnter={() => setIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
            <div className='content'>
              <h2 class='name'>{currentProduct.name}</h2>
              <h3 class='price'>
                <span>$ </span> {currentProduct.price}
              </h3>
              <div className='details'>
                <h4>Details:</h4>
                <p class='text'>{currentProduct.details}</p>
              </div>
              <div className='button-row'>
                <button class='btn secondary-btn'>Agregar al carrito</button>
                <button class='btn primary-btn'>Comprar Ahora</button>
              </div>
            </div>
          </div>
        )}
        <div className='featured'>
          <h2>Popular</h2>
          <div className='cards'>
            {products.map((product) => {
              return (
                <div key={product.slug.current} class='popular-card'>
                  <img src={product.imageUrl[0]} alt='' />
                  <p class='name'>{product.name}</p>
                  <p class='price'>
                    {' '}
                    <span>$ </span> {product.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
