const express = require("express");
const router = express.Router();
const syllabusController = require("../../controllers/student/syllabusController");

// 강의 목록, 강의 상세 정보(강의 계획서)
router.get("/list", syllabusController.getAllCourses);
router.get("/detail/:courseCode", syllabusController.getCourseByCode);

module.exports = router;