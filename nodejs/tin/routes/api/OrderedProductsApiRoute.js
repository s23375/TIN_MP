const express = require('express');
const router = express.Router();

const orderedApiController = require('../../api/OrderedProductsAPI');

router.get('/', orderedApiController.getOrdereds); //TODO VERY IMPORTANT LESSON: THE NAME YOU GIVE FOR COMING ID HERE WILL BE USED TO REFER TO IT IN orderedApiController
router.get('/:IDorderedProduct', orderedApiController.getOrderedById);
router.post('/', orderedApiController.createOrdered);
router.put('/:IDorderedProduct', orderedApiController.updateOrdered);
router.delete('/:IDorderedProduct', orderedApiController.deleteProduct);

module.exports = router;