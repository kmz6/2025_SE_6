const express = require("express");
const router = express.Router();
const timetableController = require("../../controllers/timetableController");

// 학생 시간표
router.get("/:student_id", timetableController.getTimetable);

module.exports = router;