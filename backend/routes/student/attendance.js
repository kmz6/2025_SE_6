const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/student/attendanceController");

router.get("/:lectureId/meta", attendanceController.getStudentAttendanceMeta);
router.get("/:lectureId/status", attendanceController.getStudentAttendanceStatus);

module.exports = router;