const express = require('express');
const router = express.Router();
const checkauth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/',checkauth,OrdersController.orders_get_all);

router.post('/', checkauth, OrdersController.orders_create_order);

router.get('/:orderId', checkauth, OrdersController.get_order_by_id);

router.delete('/:orderId',checkauth, OrdersController.delete_by_order_id);

module.exports = router;