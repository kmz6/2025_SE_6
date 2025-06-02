const express = require("express");
const router = express.Router();
const myController = require("../controllers/myController");

// GET /my/:userId
router.get("/:userId", myController.getUserById);

module.exports = router;
