import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Uniblox from './Uniblox'; 
import Cart from './pages/Cart'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Uniblox />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
