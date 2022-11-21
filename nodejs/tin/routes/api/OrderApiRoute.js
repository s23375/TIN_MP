const express = require('express');
const router = express.Router();

const orderApiController = require('../../api/OrderAPI');

router.get('/', orderApiController.getOrders);
router.get('/:IDorder', orderApiController.getOrderById);
router.post('/', orderApiController.createOrder);
router.put('/:IDorder', orderApiController.updateProduct);
router.delete('/:IDorder', orderApiController.deleteOrder);

module.exports = router;