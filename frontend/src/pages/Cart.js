
import "./Cart.css";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/material/Chip';
// This is the Cart page where all the items added will be displayed
const Cart = () =>{
    return (
        <div className="Cart">
            <div className="Cart-header">
                Cart Items
            </div>
            <Card className="Cart-card"sx={{ height:200,width: 900 }}>
              <AspectRatio minHeight="100px" maxHeight="200px" >
                <div className="Cart-card-content">
                  <Typography level="title-lg">Yosemite National Park</Typography>
                  <Typography level="body-sm">April 24 to May 02, 2021</Typography>
                  <Typography level="body-xs">Total price:</Typography>
                  <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>$2,900</Typography>
                </div>
                <img src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286" srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x" loading="lazy" alt=""/>
              </AspectRatio>
            </Card>
            <div className="Cart-total">
              <div className="Cart-total-title">
                Total : $
              </div>
              <div className="Cart-total-value">
                Value
              </div> 
            </div>
            <div className="Cart-coupon">
              <Chip className="Cart-coupon-text">
              label="You are eligible to apply coupon" 
              variant="outlined"
              </Chip>
            </div>
        </div>
    );
};
export default Cart;
