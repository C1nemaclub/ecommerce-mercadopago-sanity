import { useState, useEffect } from 'react';
import { useStateContext } from './context/stateContext';
import Products from './components/Products.js';

function App() {
  const { products, addToCart, cart, totalPrice } = useStateContext();

  function handleClick(product) {
    addToCart(product);
  }

  const cartElements = cart.map((item) => {
    return (
      <div key={item.slug}>
        {item.name} - {item.quantity}
        <button>Add</button>
        <button>Reduce</button>
      </div>
    );
  });

  return (
    <div className='App'>
      <Products products={products} handleClick={handleClick} />
      {cart.length > 0 ? cartElements : <p>El carrito esta vacio</p>}
      Total: {totalPrice}
    </div>
  );
}

export default App;
