const express = require('express');
const router = express.Router();
const resetpwdController = require('../controllers/resetpwdController');

// 비밀번호 초기화
router.post('/', resetpwdController.resetPassword);

module.exports = router;