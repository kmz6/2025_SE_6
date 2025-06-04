const express = require("express");
const router = express.Router();
const leaveController = require("../../controllers/staff/leaveController");

// GET /leave/staff/count
router.get("/count", leaveController.getCount);

// GET /leave/staff/info
router.get("/info", leaveController.getRequest);

// PATCH /leave/staff/approve/:req_id/:req_type
router.patch("/approve/:req_id/:req_type", leaveController.patchLeaveApprove);

// PATCH /leave/staff/reject/:req_id
router.patch("/reject/:req_id", leaveController.patchLeaveReject);

module.exports = router;