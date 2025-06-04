const express = require("express");
const router = express.Router();
const lecturelistController = require("../../controllers/faculty/lecturelistController");

router.get("/:professorId", lecturelistController.getLectureListByProfessor);

module.exports = router;