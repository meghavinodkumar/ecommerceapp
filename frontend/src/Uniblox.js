import "./Uniblox.css";
import unibloxlogo from "./uniblox_io_logo.jpeg";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import laptop from "./images/laptop.jpeg";
import headphone from "./images/headphone.webp";
import shoes from "./images/shoes.jpg";
import smartphone from "./images/smartphone.jpg";
import bag from "./images/bag.webp";
import watch from "./images/watch.webp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const Uniblox = ({ addToCart }) => {
  //hook used for navigation
  const navigate = useNavigate();
  //handle onClick for navigation to the Cart page
  const handleOnClick = () => {
    navigate("/cart");
  };

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, []);

  const image_map = [
    { image_id: 1, image: bag },
    { image_id: 2, image: laptop },
    { image_id: 3, image: smartphone },
    { image_id: 4, image: headphone },
    { image_id: 5, image: shoes },
    { image_id: 6, image: watch },
  ];

  const getImage = (image_id) => {
    for (var ii = 0; ii < image_map.length; ii++) {
      if (image_map[ii].image_id == image_id) {
        return image_map[ii].image;
      }
    }
  };

  const [getItem, setGetItem] = useState([]);
  const addItems = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(item), // Include the item in the body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Item added:", data);
      setGetItem(data);
      setOpen(true);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Uniblox">
      <div className="Uniblox-header">
        <div className="Uniblox-header-content">
          <img src={unibloxlogo} className="Uniblox-logo" alt="logo" />
          <p className="Uniblox-title">Uniblox</p>
        </div>
        <div className="Uniblox-topMenu">
          <Button className="Uniblox-topMenu-signin">Sign in</Button>
          <Button className="Uniblox-topMenu-cart" onClick={handleOnClick}>
            Cart
          </Button>
        </div>
      </div>
      <div className="Uniblox-bodyItems">
        {items.map((item, index) => (
          <div className="Uniblox-bodyItems-item" key={index}>
            <img
              src={getImage(item.image_id)}
              className="Uniblox-bodyItems-item-img"
              alt={item.name}
            />
            <p className="Uniblox-bodyItems-item-name">{item.name}</p>
            <p className="Uniblox-bodyItems-item-price">${item.price}</p>
            <Button
              className="Uniblox-bodyItems-item-addItem"
              onClick={() => addItems(item)}
            >
              Add to cart
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="ITEM ADDED TO CART!"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uniblox;
