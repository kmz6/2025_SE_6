const express = require("express");
const router = express.Router();
const syllabusController = require("../../controllers/student/syllabusController");

router.get("/list", syllabusController.getAllCourses);
router.get("/detail/:courseCode", syllabusController.getCourseByCode);

module.exports = router;