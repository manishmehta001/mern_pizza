const express = require('express');
const orderController = require('./../controllers/orderController');
const router = express.Router();
router.route('/placeorder').post(orderController.createOrder);
router.route('/userorders').post(orderController.getOrder);
router.route('/getallorders').get(orderController.getAllOrder);
router.route('/deliverorder').post(orderController.deliverOrder);
module.exports = router;
