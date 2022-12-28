import React from 'react';
import { useStateContext } from '../context/stateContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/banner/banner.scss';

export default function Banner() {
  const { banner } = useStateContext();

  return (
    <>
      <div className='banner-container'>
        <div className='hero'>
          <h1 className='hero-text'>
            Make <br /> Leather <br /> Taste <br /> Better
          </h1>
          <div className='button-row'>
            <button className='btn primary-btn'>Ver Productos</button>
            <button className='btn secondary-btn'>Sobre Nosotros</button>
          </div>
        </div>
        <div className='img-container'>
          <LazyLoadImage src={banner[0].imageUrl} alt='banner' effect='blur' />
        </div>
      </div>
    </>
  );
}
