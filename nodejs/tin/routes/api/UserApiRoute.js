const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserAPI');

router.get('/', userApiController.getUsers);
router.get('/:IDuser', userApiController.getUserByID);
router.post('/', userApiController.createUser);
router.put('/:IDuser', userApiController.updateUser);
router.delete('/:IDuser', userApiController.deleteUser);

module.exports = router;