const express = require("express");
const router = express.Router();
const gradeController = require("../../controllers/faculty/profGradeController");

// GET /prof/grade/:user_id/list/
router.get("/:user_id/list", gradeController.getCourses);

module.exports = router;