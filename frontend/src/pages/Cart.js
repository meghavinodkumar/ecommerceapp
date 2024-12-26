import "./Cart.css";
import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import laptop from "../images/laptop.jpeg";
import headphone from "../images/headphone.webp";
import shoes from "../images/shoes.jpg";
import smartphone from "../images/smartphone.jpg";
import bag from "../images/bag.webp";
import watch from "../images/watch.webp";
import Snackbar from "@mui/material/Snackbar";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// This is the Cart page where all the items added will be displayed
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      });
  }, []);
  const generateCoupon = async () => {
    try {
      const response = await fetch("http://localhost:5000/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Generated Coupon:", data);
      setCoupon(data.code);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
  const apply_coupon = async () => {
    console.log(coupon);
    try {
      const response = await fetch(
        "http://localhost:5000/apply_coupon/" + coupon,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Coupon applied:", data);
      setCart(data);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
  const place_order = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCart({ items: [] });
      setOpen(true);
      console.log("Coupon applied:", data);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
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
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Cart">
      <div className="Cart-header">Cart Items</div>
      {cart?.items?.map((item, index) => (
        <Card className="Cart-card" sx={{ height: 170, width: 600 }}>
          <img
            className="Cart-card-image"
            src={getImage(item.image_id)}
            loading="lazy"
            alt=""
            style={{ objectFit: "cover" }}
          />
          <div
            className="Cart-card-content"
            key={index}
            style={{ marginRight: "15px" }}
          >
            <Typography className="Card-item-name" level="title-lg">
              {item.name}
            </Typography>
            <Typography lassName="Card-item-price" level="body-xs">
              Price : ${item.price}
            </Typography>
          </div>
        </Card>
      ))}
      <div className="Cart-footer">
        <Stack>
          <Stack>
            <div className="Cart-total">
              <div className="Cart-total-title">Total : $</div>
              <div className="Cart-total-value">{cart.total_price}</div>
            </div>
          </Stack>

          <div className="Cart-couponEligibility">
            <Stack
              spacing={{ xs: 0.5, sm: 1 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {cart?.discount_eligibility && (
                <Button
                  style={{
                    color: "black",
                    borderColor: "black",
                    margin: "10px;",
                    background: "rgb(197, 191, 191)",
                  }}
                  className="Cart-coupon-text"
                  onClick={() => generateCoupon()}
                  variant="outlined"
                >
                  <span>
                    You are eligible for discount. Click here to apply coupon
                  </span>
                </Button>
              )}
              {cart?.discount_eligibility && (
                <TextField
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "2px",
                    padding: "1px",
                    background: "rgb(197, 191, 191)",
                  }}
                  id="outlined-basic"
                  value={coupon}
                />
              )}
              {cart?.discount_eligibility && (
                <Button
                  style={{
                    color: "black",
                    borderColor: "black",
                    background: "rgb(197, 191, 191)",
                  }}
                  onClick={() => apply_coupon(coupon)}
                >
                  Apply Coupon
                </Button>
              )}
            </Stack>
            <Stack>
              <Button
                style={{
                  marginTop: "5px",
                  color: "black",
                  borderColor: "black",
                  background: "rgb(197, 191, 191)",
                }}
                onClick={() => place_order()}
              >
                PLACE ORDER
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="ORDER PLACED!"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
};
export default Cart;
