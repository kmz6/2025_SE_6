const express = require('express');
const router = express.Router();
const resetpwdController = require('../controllers/resetpwdController');

router.post('/', resetpwdController.resetPassword);

module.exports = router;