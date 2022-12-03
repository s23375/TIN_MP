const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

router.get('/', orderController.showOrderList);
router.get('/add', orderController.showAddOrderForm);
router.get('/details/:IDorder', orderController.showOrderDetails);
router.get('/edit/:IDorder', orderController.showOrderEdit);
/*
the paths defined here will be used in hrefs when you want to refer to them, like
/ProductModel/add leads to "Add new product" page
 */
router.post("/add", orderController.addOrder);
router.post("/edit", orderController.updateOrder);
router.get("/delete/:IDorder", orderController.deleteOrder);

module.exports = router; // exporting router so it can be used elsewhere