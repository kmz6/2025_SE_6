const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/student/attendanceController");

// 출석 메타 데이터, 출석 정보
router.get("/:lectureId/meta", attendanceController.getStudentAttendanceMeta);
router.get("/:lectureId/status", attendanceController.getStudentAttendanceStatus);

module.exports = router;