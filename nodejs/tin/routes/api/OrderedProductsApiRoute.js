const express = require('express');
const router = express.Router();

const orderedApiController = require('../../api/OrderedProductsAPI');

router.get('/', orderedApiController.getOrdereds); //TODO VERY IMPORTANT LESSON: HOW YOU NAME ID HERE WILL MATTER IN orderedApiController WHERE IT GOES NEXT
router.get('/:IDorderedProduct', orderedApiController.getOrderedById);
router.post('/', orderedApiController.createOrdered);
router.put('/:IDorderedProduct', orderedApiController.updateOrdered);
router.delete('/:IDorderedProduct', orderedApiController.deleteProduct);

module.exports = router;