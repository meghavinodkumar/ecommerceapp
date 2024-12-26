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
            <div className="Uniblox-bodyItems-item">
              <img src={bag} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Bag</p>
              <p className="Uniblox-bodyItems-item-price">$50</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            <div className="Uniblox-bodyItems-item">
              <img src={laptop} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Laptop</p>
              <p className="Uniblox-bodyItems-item-price">$2000</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            <div className="Uniblox-bodyItems-item">
              <img src={smartphone} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Smartphone</p>
              <p className="Uniblox-bodyItems-item-price">$1000</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            <div className="Uniblox-bodyItems-item">
              <img src={headphone} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Headphone</p>
              <p className="Uniblox-bodyItems-item-price">$100</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            <div className="Uniblox-bodyItems-item">
              <img src={shoes} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Shoes</p>
              <p className="Uniblox-bodyItems-item-price">$200</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            <div className="Uniblox-bodyItems-item">
              <img src={watch} className="Uniblox-bodyItems-item-img" alt="logo" />
              <p className="Uniblox-bodyItems-item-name">Watch</p>
              <p className="Uniblox-bodyItems-item-price">$150</p>
              <Button className="Uniblox-bodyItems-item-addItem">
                Add to cart
              </Button>
            </div>
            </div>
          </div>
  );
}

export default Uniblox;
