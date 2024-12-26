import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Uniblox from './Uniblox'; 
import Cart from './pages/Cart'; 
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Uniblox addToCart={addToCart}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
