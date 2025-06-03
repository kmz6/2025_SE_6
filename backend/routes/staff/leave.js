const express = require("express");
const router = express.Router();
const leaveController = require("../../controllers/staff/leaveController");

// POST /leave/staff/info
router.get("/info", leaveController.getRequest);

module.exports = router;