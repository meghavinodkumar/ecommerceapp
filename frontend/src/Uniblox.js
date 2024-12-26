import './Uniblox.css';
import unibloxlogo from "./uniblox_io_logo.jpeg";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import laptop from "./images/laptop.jpeg";
import headphone from "./images/headphone.webp";
import shoes from "./images/shoes.jpg";
import smartphone from "./images/smartphone.jpg";
import bag from "./images/bag.webp";
import watch from "./images/watch.webp";
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Uniblox=()=> {
  //hook used for navigation
  const navigate = useNavigate(); 
//handle onClick for navigation to the Cart page
  const handleOnClick = () => {
    navigate('/cart'); 
  };
  const [items] = useState([
    { name: 'Bag', price: 50, image: bag },
    { name: 'Laptop', price: 2000, image: laptop },
    { name: 'Smartphone', price: 1000, image: smartphone },
    { name: 'Headphone', price: 100, image: headphone },
    { name: 'Shoes', price: 200, image: shoes },
    { name: 'Watch', price: 150, image: watch },
  ]);
  return (
    <div className="Uniblox">
      <div className='Uniblox-header'>
        <header className="Uniblox-header-content">
          <img src={unibloxlogo} className="Uniblox-logo" alt="logo" />
          <p className="Uniblox-title">Uniblox</p>
        </header>
        <div className="Uniblox-searchBar">
        <SearchBar items={items}/>
        </div>
        <div className="Uniblox-topMenu">
          <Button className="Uniblox-topMenu-signin">
            Signin
          </Button>
          <Button className="Uniblox-topMenu-cart" onClick={handleOnClick}>
            Cart
          </Button>
        </div>
      </div>
          <div className="Uniblox-bodyItems">
          {items.map((item, index) => (
            <div className="Uniblox-bodyItems-item" key={index}>
              <img src={item.image}className="Uniblox-bodyItems-item-img" alt={item.name}/>
              <p className="Uniblox-bodyItems-item-name">{item.name}</p>
              <p className="Uniblox-bodyItems-item-price">${item.price}</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
           </div>
          ))}
            
        </div>
      </div>
  );
}

export default Uniblox;
