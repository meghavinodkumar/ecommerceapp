# uniblox-ecommerceapp
Backend and frontend components for an ecommerce application
Frontend - React 
Backend - Python Flask 
Data Storage - In memory (List-hashmap)

## Getting Started

### Setting up flask app  

1. Download the repository onto your local machine
2. Create python virtual environment `python -m venv myenv`
3. Activate virtual environment `source myenv/bin/activate`
4. Install the following python modules Flask==3.1.0 and Flask-Cors==5.0.0
5. `cd uniblox/backend`
6. Start the flask application `python app.py`
7. This will start in flask server on port 5000

### Setting up react app

1. Make sure the node environment set up
2. `cd uniblox/frontend`
3. Issue the command `npm install` this will install react and all the necessary libraries
4. Run `npm start`
5. This will start the react server on port 3000

### Verifying the setup

1. Open a browser and type in this url `http://localhost:3000`
2. You should be able to view the landing page (list of products)

## Application flow 

1. From the landing page, add one or more item to the cart by clicking on the `Add to cart`.
2. Click on the Cart menu in the top right corner.
3. List of items in your shopping cart will be displayed.
4. Click on `Place order`.
5. For every third order (nth order - n is assumed to be 3 here) the user will be presented with an option to avail a discount on the purchase.
6. The user will be prompted to click on a field which generates a coupon code.
7. The coupon code is auto filled in the text field.
8. On click of `Apply`, 10% discount is applied on the total price.


Here is the API calling sequence to show the user-application interactions
## Application APIs 

| API | Purpose | HTTP Method | Payload |
| --- | ------- | ----------- | ------- |
| /products | Get the list of products | GET | NIL |
| /items | Add item to the cart | POST | {"id" : 123, "name" : "laptop", "price" : 13.28, "image_id" : 1} |
| /items | Get the list of items in the cart. This returns the details of the items in the cart along with the price total and the eligibility of applying a coupon as a boolean | GET | NIL |
| /items/<item_id> | Removes an item from the cart | DELETE | NIL |
| /apply_coupon/<coupon_code> | Apply a coupon to the items in the cart. If a valid coupon is supplied, the discount is applied to the total. For an invalid coupon, the total price will not be changed | POST | NIL |
| /orders | Place the order | POST | NIL |
| /orders | List all the orders | GET | NIL |


## Admin APIs

| API | Purpose | HTTP Method | 
| --- | ------- | ----------- |
| /coupons | Generate a coupon code for the user | POST |
| /admin_stats | List the count of items purchased, total purchase amount, list of discount codes and the total discount amount | GET |


