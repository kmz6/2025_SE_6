const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/', signupController.userSignup);

module.exports = router;