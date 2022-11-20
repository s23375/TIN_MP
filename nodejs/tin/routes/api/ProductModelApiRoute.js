const express = require('express');
const router = express.Router();

const productApiController = require('../../api/ProductModelAPI');

router.get('/', productApiController.getProducts);
router.get('/:IDproduct', productApiController.getProductById);
router.post('/', productApiController.createProduct);
router.put('/:IDproduct', productApiController.updateProduct);
router.delete('/:IDproduct', productApiController.deleteProduct);

module.exports = router;