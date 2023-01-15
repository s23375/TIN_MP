const express = require('express');
const router = express.Router();
const isAuth = require("../../middleware/isAuth")

const productApiController = require('../../api/ProductModelAPI');

router.get('/', isAuth, productApiController.getProducts); //TODO VERY IMPORTANT LESSON: THE NAME YOU GIVE FOR COMING ID HERE WILL BE USED TO REFER TO IT IN productApiController
router.get('/:IDproduct', isAuth, productApiController.getProductById);
router.post('/', isAuth, productApiController.createProduct);
router.put('/:IDproduct', isAuth, productApiController.updateProduct);
router.delete('/:IDproduct', isAuth, productApiController.deleteProduct);

module.exports = router;