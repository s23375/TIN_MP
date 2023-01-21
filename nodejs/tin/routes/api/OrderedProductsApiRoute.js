const express = require('express');
const router = express.Router();

const orderedApiController = require('../../api/OrderedProductsAPI');
const isAuth = require("../../middleware/isAuth");

router.get('/', isAuth, orderedApiController.getOrdereds); //TODO VERY IMPORTANT LESSON: THE NAME YOU GIVE FOR COMING ID HERE WILL BE USED TO REFER TO IT IN orderedApiController
router.get('/:IDorderedProduct', isAuth, orderedApiController.getOrderedById);
router.post('/', isAuth, orderedApiController.createOrdered);
router.put('/:IDorderedProduct',  isAuth, orderedApiController.updateOrdered);
router.delete('/:IDorderedProduct', isAuth, orderedApiController.deleteProduct);

module.exports = router;