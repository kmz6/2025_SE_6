const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

// 회원가입
router.post('/', signupController.userSignup);

module.exports = router;