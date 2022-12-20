import React from 'react';
import { useStateContext } from '../context/stateContext';

export default function ShoppingCart() {
  const {
    cart,
    totalPrice,
    addQty,
    decQty,
    removeFromCart,
    requestMercadoPagoPreferenceId,
  } = useStateContext();

  const cartElements = cart.map((item) => {
    return (
      <div key={item.slug}>
        {item.title} - {item.quantity}
        <button onClick={() => addQty(item)}>Add</button>
        <button onClick={() => decQty(item)}>Reduce</button>
        <button onClick={() => removeFromCart(item)}>Remove</button>
      </div>
    );
  });

  return (
    <div>
      ShoppingCart
      {cartElements}
      Total: {totalPrice}
      <button onClick={() => requestMercadoPagoPreferenceId()}>Procced </button>
      <div className='cho-container'></div>
    </div>
  );
}
