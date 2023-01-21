const express = require('express');
const router = express.Router();

const orderApiController = require('../../api/OrderAPI');
const isAuth = require("../../middleware/isAuth");

router.get('/', isAuth, orderApiController.getOrders); //TODO VERY IMPORTANT LESSON: THE NAME YOU GIVE FOR COMING ID HERE WILL BE USED TO REFER TO IT IN orderApiController
router.get('/:IDorder', isAuth, orderApiController.getOrderById);
router.post('/', isAuth, orderApiController.createOrder);
router.put('/:IDorder', isAuth, orderApiController.updateProduct);
router.delete('/:IDorder', isAuth, orderApiController.deleteOrder);

module.exports = router;