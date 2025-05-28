const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/getUsers', userController.getUsers);
router.post('/registerUser', userController.registerUser);
router.post('/activateAccount', userController.activateAccount);
router.delete('/removeUser', userController.removeUser);
router.post('/loginUser', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;
