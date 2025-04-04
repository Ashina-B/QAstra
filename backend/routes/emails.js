const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emails');

router.post('/registration_email', emailController.sendRegistrationEmail);
router.post('/resend_activation_email', emailController.resendActivationEmail);

module.exports = router;
