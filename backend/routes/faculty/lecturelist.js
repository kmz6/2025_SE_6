const express = require("express");
const router = express.Router();
const lecturelistController = require("../../controllers/faculty/lecturelistController");

// 교수 강의 목록
router.get("/:professorId", lecturelistController.getLectureListByProfessor);

module.exports = router;