const express = require('express');
const router = express.Router();
const orderedProductsController = require('../controllers/orderedProductsController')

router.get('/', orderedProductsController.showOrderedProductsList);
router.get('/add', orderedProductsController.showAddOrderedProductsForm);
router.get('/details/:IDorder', orderedProductsController.showOrderedProductsDetails);
router.get('/edit/:IDorder', orderedProductsController.showAddOrderedProductsForm);
/*
the paths defined here will be used in hrefs when you want to refer to them, like
/ProductModel/add leads to "Add new product" page
 */

module.exports = router; // exporting router so it can be used elsewhere