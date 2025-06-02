const express = require("express");
const router = express.Router();
const syllabusController = require("../../controllers/faculty/syllabusController");

// 교수 본인 강의 목록
router.get("/list", syllabusController.getCoursesByFaculty);

// 강의 상세 조회
router.get("/detail/:courseCode", syllabusController.getCourseDetail);

// 강의계획서 수정
router.put("/update/:courseCode", syllabusController.updateCourse);

module.exports = router;