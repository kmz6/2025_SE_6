const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/faculty/attendanceController");

// 수강생 목록 + 출석 내역 가져오기
router.get("/:courseId/students", attendanceController.getStudentsWithAttendance);

// 출석 저장하기
router.post("/:courseId/save", attendanceController.saveAttendance);

module.exports = router;