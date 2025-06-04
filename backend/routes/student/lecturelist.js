const express = require("express");
const router = express.Router();
const lecturelistController = require("../../controllers/student/lecturelistController");

router.get("/:studentId", lecturelistController.getLectureListByStudent);

module.exports = router;