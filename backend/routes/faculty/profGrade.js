const express = require("express");
const router = express.Router();
const gradeController = require("../../controllers/faculty/profGradeController");

// GET /prof/grade/:user_id/list
router.get("/:user_id/list", gradeController.getCourseList);

// GET /prof/grade/:course_id
router.get("/:course_id", gradeController.getCourseInfo);

// GET /prof/grade/student/:course_id
router.get("/student/:course_id", gradeController.getStudentInfo);

// PATCH /prof/grade/update
router.patch("/update", gradeController.updateScores);

module.exports = router;