import json
import random
from flask import Flask, jsonify, request
#creating a new flask application 
app= Flask(__name__)
#array of cart items - sample products in the Uniblox store 
products=[ { 'id': 1, 'name': 'Torch', 'price':'100' }, { 'id': 2, 'name': 'Frying Pan', 'price':'400' }, { 'id': 3, 'name': 'Basketball','price':'800' }]
#in memory data storage 
order=[]
cart=[]
discountCodes=[]
#items in the cart
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)
#add items to cart 
@app.route('/items',methods=['POST'])
def add_item_to_cart():
    if not item:
        return jsonify({'error': 'Product not found'}), 404
    item=json.loads(request.data)
    cart.append(item)
    return jsonify(item)
#list items in the cart
@app.route('/items', methods=['GET'])
def get_items_in_cart():
    return jsonify(cart)
#get Couponcode
@app.route('/coupon', methods=['GET'])
def get_coupon():
    return f"DISCOUNT-{random.randint(1000, 9999)}"
#generate coupon code 
@app.route('/coupon', methods=['POST'])
def generate_coupon():
    return couponCode
#checkout all the items in the cart 
@app.route('/checkout', methods=['POST'])
def checkout(item,couponcode):

    #Generate coupon for every nth order 
    if len(order) % 10 == 0:
        couponCode = get_coupon()

#Lists count of items purchased, total purchase amount, list of discount codes and total discount amount
@app.route('/adminStats',methods=['GET'])
def admin_stats():
    

if __name__ == '__main__':
    app.run(port=5000)