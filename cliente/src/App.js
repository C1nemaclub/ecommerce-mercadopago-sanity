import { useState, useEffect } from 'react';
import { useStateContext } from './context/stateContext';
import ShoppingCart from './components/ShoppingCart';
import Home from './pages/Home.js';
import './styles/globalStyles/global.scss';
import Success from './pages/Success.js';
import Error from './pages/Error.js';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <ShoppingCart />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/success' element={<Success />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
