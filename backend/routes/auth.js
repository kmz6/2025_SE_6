const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /users/login
router.post("/login", authController.userLogin);

module.exports = router;
