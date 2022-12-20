import React from 'react';
import { useStateContext } from '../context/stateContext';

export default function Banner() {
  const { banner } = useStateContext();

  return (
    <div>
      Banner
      {/* <img src={banner[0].imageUrl} alt='' /> */}
    </div>
  );
}
