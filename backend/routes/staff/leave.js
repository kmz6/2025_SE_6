const express = require("express");
const router = express.Router();
const leaveController = require("../../controllers/staff/leaveController");

// GET /leave/staff/count
router.get("/count", leaveController.getCount);

// GET /leave/staff/info
router.get("/info", leaveController.getRequest);

module.exports = router;