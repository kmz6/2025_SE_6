const express = require("express");
const router = express.Router();
const leaveController = require("../../controllers/student/leaveController");

// GET /leave/student/info/${user_id}
router.get("/info/:user_id", leaveController.getLeaves);

// POST /leave/student/${user_id}/${request_type}
router.post("/:user_id/:request_type", leaveController.requestLeaves);

// DELETE /leave/student/cancel/${req_id}
router.delete("/cancel/:req_id", leaveController.requestCancel);

module.exports = router;