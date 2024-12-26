import unittest
import json
from app import app

class TestApp(unittest.TestCase):
    
    # Set up the test client
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    ### Test Products API ###
    
    def test_get_products_list(self):
        """Test the GET /products API"""
        response = self.client.get('/products')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        # Check if products are returned
        self.assertTrue(len(data) > 0) 

    ### Test Cart APIs ######
    
    def test_add_item_to_cart(self):
        """Test the POST /items API to add an item to the cart"""
        item = {
            "id": 1,
            "name": "Bag",
            "price": 50,
            "image_id": 1
        }
        response = self.client.post('/items', data=json.dumps(item), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Bag')
        self.assertEqual(data['price'], 50)

    def test_get_items_in_cart(self):
        """Test the GET /items API to fetch all items in the cart"""
        response = self.client.get('/items')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        # Cart is returned as a dictionary
        self.assertIsInstance(data, dict)  
    
    def test_delete_item_from_cart(self):
        """Test DELETE /items/<id> API to delete an item from the cart"""
        # Add an item to cart first
        item = {
            "id": 1,
            "name": "Bag",
            "price": 50,
            "image_id": 1
        }
        self.client.post('/items', data=json.dumps(item), content_type='application/json')
        
        response = self.client.delete('/items/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        # Verify the deleted item has the same ID
        self.assertEqual(data['id'], 1)  

    ### Test Coupon APIs ####

    def test_generate_coupon(self):
        """Test POST /coupons API to generate a coupon"""
        response = self.client.post('/coupons')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("code", data)
        # Ensure the coupon code is a 6-digit number
        self.assertEqual(len(str(data['code'])), 6)  

    def test_apply_coupon(self):
        """Test POST /apply_coupon/<code> API to apply a coupon"""
        # First, generate a coupon
        response = self.client.post('/coupons')
        data = json.loads(response.data)
        coupon_code = data['code']

        # Then apply the generated coupon
        response = self.client.post(f'/apply_coupon/{coupon_code}')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('total_price', data)

    ### Test Orders API #####

    def test_place_order(self):
        """Test POST /orders API to place an order"""
        # Add items to cart first
        item = {
            "id": 1,
            "name": "Bag",
            "price": 50,
            "image_id": 1
        }
        self.client.post('/items', data=json.dumps(item), content_type='application/json')
        
        response = self.client.post('/orders')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue('items' in data)  # Ensure items are present in the order

    def test_get_orders(self):
        """Test GET /orders API to fetch all previous orders"""
        response = self.client.get('/orders')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)  # Orders should be returned as a list

    ##########################
    ### Test Admin Stats API ###
    ##########################

    def test_admin_stats(self):
        """Test GET /admin_stats API to get admin stats"""
        response = self.client.get('/admin_stats')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('total_items_purchased', data)
        self.assertIn('total_purchase_amount', data)

if __name__ == '__main__':
    unittest.main()
