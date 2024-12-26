
import "./Cart.css";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

const Cart = ()=>{
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
        </div>
    );
};
export default Cart;
