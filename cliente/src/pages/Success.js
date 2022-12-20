import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const params = location.search.split('&');

  const obj = {};
  params.forEach((item) => {
    const key = item.split('=')[0].replace('?', '');
    const value = item.split('=')[1];
    obj[key] = value;
  });
  console.log(obj);

  return <h1>Success</h1>;
}
