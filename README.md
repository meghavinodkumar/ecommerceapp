# uniblox-ecommerceapp
Backend and frontend components for an ecommerce application
Frontend - React 
Backend - Python Flask 
Data Storage - In memory (List-hashmap)

Here is the API calling sequence to show the user-application interactions

To get the list of products
http://localhost:5000/products => HTTP method=GET

Add item to the cart:
http://localhost:5000/items  => HTTP method=POST . Sample payload: {"id" : 123, "Name" : "product1", "Price" : 13.28}

Get the list of items in the cart.
This returns the details of the items in the cart along with the price total and the eligibility of applying a coupon as a boolean
http://localhost:5000/items =>  HTTP method=GET

Remove an item from the cart
http://localhost:5000/items/<item_id>  => HTTP Method=DELETE

Generate a coupon code for the user
http://localhost:5000/coupons  => HTTP Method=POST.

Apply a coupon to the items in the cart. If a valid coupon is supplied, the discount is applied to the total. For an invalid coupon, the total price will not be changed.
http://localhost:5000/apply_coupon/<coupon_code>  => HTTP method=POST

Place the order
http://localhost:5000/place_order  => HTTP method=POST

List the previous orders:
http://localhost:5000/orders => HTTP method=GET
