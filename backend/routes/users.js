const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/getUsers', userController.getUsers);
router.post('/registerUser', userController.registerUser)
router.post('/activateAccount', userController.activateAccount)

module.exports = router;
