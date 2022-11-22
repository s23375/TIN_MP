const express = require('express');
const router = express.Router();

const productApiController = require('../../api/ProductModelAPI');

router.get('/', productApiController.getProducts); //TODO VERY IMPORTANT LESSON: THE NAME YOU GIVE FOR COMING ID HERE WILL BE USED TO REFER TO IT IN productApiController
router.get('/:IDproduct', productApiController.getProductById);
router.post('/', productApiController.createProduct);
router.put('/:IDproduct', productApiController.updateProduct);
router.delete('/:IDproduct', productApiController.deleteProduct);

module.exports = router;