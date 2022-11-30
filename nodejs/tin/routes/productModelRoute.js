const express = require('express'); // importing Express
const router = express.Router(); // obtaining router
const productModelController = require('../controllers/productModelController') // importing controller

router.get('/', productModelController.showProductModelList);
router.get('/add', productModelController.showAddProductModelForm);
router.get('/details/:IDproduct', productModelController.showProductModelDetails);
router.get('/edit/:IDproduct', productModelController.showProductModelEdit);
/*
the paths defined here will be used in hrefs when you want to refer to them, like
/ProductModel/add leads to "Add new product" page
 */
router.post("/add", productModelController.addProductModel);
router.post("/edit", productModelController.updateProductModel);
router.get("/delete/:IDproduct", productModelController.deleteProductModel);

module.exports = router; // exporting router so it can be used elsewhere