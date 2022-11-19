const express = require('express'); // importing Express
const router = express.Router(); // obtaining router
const productModelController = require('../controllers/productModelController') // importing controller

router.get('/', productModelController.showProductModelList);
router.get('/add', productModelController.showAddProductModelForm);
router.get('/details/:IDproduct', productModelController.showProductModelDetails);

module.exports = router; // exporting router so it can be used elsewhere