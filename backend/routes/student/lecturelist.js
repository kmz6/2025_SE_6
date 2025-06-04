const express = require("express");
const router = express.Router();
const lecturelistController = require("../../controllers/student/lecturelistController");

// 학생 강의 정보
router.get("/:studentId", lecturelistController.getLectureListByStudent);

module.exports = router;