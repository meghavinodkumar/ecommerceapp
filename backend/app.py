import json
import random
from flask import Flask, jsonify, request
#Creating a new flask application 
app= Flask(__name__)
#Array of cart items - sample products in the Uniblox store
products=[ { 'id': 1, 'name': 'Torch', 'price':'100', 'url':'http://' },
           { 'id': 2, 'name': 'Frying Pan', 'price':'400' , 'url':'http://'},
            { 'id': 3, 'name': 'Basketball','price':'800', 'url':'http://' }
        ]
#ASSUMPTIONS : since the authentication module is missing a user_iD of 123 and "n" orders for discount are assumed 
user_id=123
n=3
discount_percentage=10
#In memory data storage
orders=[]
cart=[]
coupons=[]
@app.route('/products', methods=['GET'])
def get_products():
    """List the products"""
    return jsonify(products)

@app.route('/items',methods=['POST'])
def add_item_to_cart():
    """Add items to cart"""
    item=json.loads(request.data)
    #Error handling if there is no product found
    # TODO: add check here for null condition***************************
    if not item:
        return jsonify({'error': 'Product not found'}), 404
     #storing in temporary in memory 
    cart.append(item)
    return jsonify(item)

@app.route('/items', methods=['GET'])
def get_items_in_cart():
    """Get all items in the cart"""
    return jsonify(cart)

@app.route('/items/<id>', methods=['DELETE'])
def delete_items_in_cart(id):
    """Get all items in the cart"""
    print(id)
    for item in cart:
        if item["id"]==id:
            cart.pop(id)
    return jsonify(item)

@app.route('/coupons', methods=['POST'])
def generate_coupon():
    """Generate coupon code"""
    coupon_code = random.randint(1000, 9999)
    coupons.append({"user_id":user_id, "code": coupon_code})
    return jsonify({'user_id':user_id,'code': coupon_code})

@app.route('/coupons', methods=['GET'])
def get_coupon():
    """Get Couponcode"""
    return jsonify({'coupons':coupons})


def is_valid_code(code):
    #check if the code is valid or not 
    for coupon in coupons:
        if ((coupon["user_id"] == user_id) and (coupon["code"] == code)):
            return True
    return False


@app.route('/apply_coupon/<code>', methods=['POST'])
def apply_coupon(code):
    """Apply the coupon code"""
    #check if the code is a valid coupon code 
    totalPrice=0
    for item in cart:
        totalPrice+=item["price"]
    if is_valid_code(int(code)):
        totalPrice = totalPrice - (totalPrice*discount_percentage/100)
    return jsonify({'totalPrice':totalPrice})

#check if previous n-1 orders did not apply coupon if so return a boolean flag indicating that this order is eligible for discount 
def is_eligible_for_discount():
    num_orders_without_discount = 0
    orderLength=len(orders)
    for order in range(orderLength-1, -1, -1):
        if not orders[order]['coupon_applied']:
            num_orders_without_discount+=1
        else:
            break
    return num_orders_without_discount+1>=n
        
@app.route('/cart_items', methods=['POST'])
def cart_items(item,code):
    """Listing all the items in the cart along with the eligibility details"""
    return jsonify({'items':cart,'isEligible':is_eligible_for_discount()})

@app.route('/place_order', methods=['POST'])
def place_order(item,code):
    """Placing the order"""
    order={'items':cart,'coupon_applied':False}
    orders.append(order)
    return jsonify({order})

#Lists count of items purchased, total purchase amount, list of discount codes and total discount amount
# @app.route('/adminStats',methods=['GET'])
# def admin_stats():
    
if __name__ == '__main__':
    app.run(port=5000)