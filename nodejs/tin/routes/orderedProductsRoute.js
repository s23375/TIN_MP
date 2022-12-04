const express = require('express');
const router = express.Router();
const orderedProductsController = require('../controllers/orderedProductsController')

router.get('/', orderedProductsController.showOrderedProductsList);
router.get('/add', orderedProductsController.showAddOrderedProductsForm);
router.get('/details/:IDorderedProduct', orderedProductsController.showOrderedProductsDetails);
router.get('/edit/:IDorderedProduct', orderedProductsController.showOrderedProductsEdit);
/*
the paths defined here will be used in hrefs when you want to refer to them, like
/ProductModel/add leads to "Add new product" page
 */
router.post("/add", orderedProductsController.addOrderedProduct);
router.post("/edit", orderedProductsController.updateOrderedProduct);
router.get("/delete/:IDorderedProduct", orderedProductsController.deleteOrderedProduct);

module.exports = router; // exporting router so it can be used elsewhere