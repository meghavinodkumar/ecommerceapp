import json
import random
from flask import Flask, jsonify, request
from flask_cors import CORS

# Create a new flask application 
app = Flask(__name__)
CORS(app)

#################### Data storage ####################
# Since we are not using a persistant storage here, the following in-memory variables are used for the temporary storage

# List of products
products = [ { 'id': 1, 'name': 'Gear Aspire 30L Medium Water Restant Office (Laptop Sleeve Fits Upto 15)', 'price':50, 'image_id': 1 },
           { 'id': 2, 'name': 'Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage', 'price':2000 , 'image_id': 2 },
           { 'id': 3, 'name': 'Samsung Galaxy A16 5G (Light Green, 6GB RAM, 128GB Storage)','price':1000, 'image_id': 3  },
           { 'id': 4, 'name': 'Sony WH-CH520 Wireless Bluetooth Headphones','price':100, 'image_id': 4  },
           { 'id': 5, 'name': 'Skechers Go Walk 5 Merritt Walking Shoe','price':200, 'image_id': 5  },
           { 'id': 6, 'name': 'Michael Kors Resin Analog Rose Dial Women Watch-Mk5896, Gold Band','price':150, 'image_id': 6  }
        ]

# List of orders
orders = []

# Current shopping cart items
cart = {'items' : [], 'total_price' :0, 'discount_eligibility': False, 'coupon_applied' : False, }

# Coupons for current user
coupons = []

################## Assumptions #################
# Since the authentication module is not impemented a user_iD of 123 is assumed
user_id = 123

# Number of orders that make a user eligible for a discount 
n_orders = 3

# Discount percentage that is applicable for the 'n'th order
discount_percentage = 10

############# Products APIs ###############
@app.route('/products', methods=['GET'])
def get_products_list():
    """ List all the products """
    global products
    return jsonify(products)

############### Cart APIs ################

def update_total_and_discount_eligibility(cart):
    if (len(cart['items'])):
        cart['total_price'] = get_total_price()
        cart['discount_eligibility'] = is_eligible_for_discount(n_orders)

@app.route('/items',methods=['POST'])
def add_item_to_cart():
    """ Add an item to cart """
    global cart
    item=json.loads(request.data)
    cart['items'].append(item)
    update_total_and_discount_eligibility(cart)
    return jsonify(item)

@app.route('/items', methods=['GET'])
def get_items_in_cart():
    """ Get the list of all items in the cart along with the total and eligibility for discount """
    global cart
    # if (len(cart['items'])):
    #     cart['total_price'] = get_total_price()
    #     cart['discount_eligibility'] = is_eligible_for_discount(n_orders)
    return jsonify(cart)

@app.route('/items/<id>', methods=['DELETE'])
def delete_item_from_cart(id):
    """ Remove an item from the cart """
    global cart
    id = int(id)
    for index, item in enumerate(cart['items']):
        if item["id"]==id:
            cart['items'].pop(index) 
            break
    return jsonify(item)

############### Coupons APIs ############
@app.route('/coupons', methods=['POST'])
def generate_coupon():
    """ Generate a coupon code and store it for later use """
    global coupons
    # For now, use a randomly generated 6 digit number as the coupon code
    coupon_code = random.randint(100000, 999999)
    coupon = {"user_id":user_id, "code": coupon_code}
    coupons.append(coupon)
    return jsonify(coupon)

def is_valid_code(code):
    # check if the code is valid 
    global coupons
    for coupon in coupons:
        if ((coupon["user_id"] == user_id) and (coupon["code"] == code)):
            return True
    return False

def get_total_price():
    global cart
    totalPrice = 0
    for item in cart['items']:
        totalPrice += item["price"]
    return totalPrice

@app.route('/apply_coupon/<code>', methods=['POST'])
def apply_coupon(code):
    """ Apply the coupon code for the items in the cart"""
    # Check if the given couplecode is a valid one first
    totalPrice = get_total_price()
    if is_valid_code(int(code)):
        discount_amount = totalPrice * discount_percentage / 100
        totalPrice = totalPrice - discount_amount
        cart['coupon_applied'] = True
        cart['total_price'] = totalPrice
        cart['discount_code'] = code
        cart['discount_amount'] = discount_amount
    return jsonify(cart)

# check whether the last count-1 orders did not apply any coupons. 
# If so return a boolean flag indicating that this order is eligible for discount 
def is_eligible_for_discount(count):
    global orders
    # Count how many orders that the user has placed just before this order without discount
    num_orders_without_discount = 0
    orderLength = len(orders)
    # Traverse the orders list in the reverse order 
    for order in range(orderLength-1, -1, -1):
        if not orders[order]['coupon_applied']:
            num_orders_without_discount+=1
        else:
            break
    return num_orders_without_discount+1 >= count

@app.route('/orders', methods=['GET'])
def get_orders():
    """ Get all the previous orders for the user"""
    global orders
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def place_order():
    """Placing the order"""
    global orders, cart
    order=cart
    orders.append(order)
    # Empyt the cart after a successful order
    cart = {'items' : [], 'total_price' :0, 'discount_eligibility': False, 'coupon_applied' : False, }
    return jsonify(order)

# Lists count of items purchased, total purchase amount, list of discount codes and total discount amount
@app.route('/admin_stats',methods=['GET'])
def admin_stats():
    global orders
    num_items = 0
    total_purchase_amount = 0
    discount_codes = []
    total_discount_amount = 0

    for order in orders:
        num_items += len(order['items'])
        total_purchase_amount += order['total_price']
        if order['coupon_applied']:
            total_discount_amount + order['discount_amount']
            discount_codes.append[order['discount_code']]
    return jsonify({'total_items_purchased': num_items, 'total_purchase_amount': total_purchase_amount, 
                    'discount_codes': discount_codes, 'total_discount_amount': total_discount_amount})
    
if __name__ == '__main__':
    app.run(port=5000)