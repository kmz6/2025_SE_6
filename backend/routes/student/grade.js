const express = require("express");
const router = express.Router();
const gradeController = require("../../controllers/student/gradeController");

// GET /grade/semester/${user_id}
router.get("/semester/:user_id", gradeController.getSemesters);

// GET /grade/${user_id}/${year}/${semester}
router.get("/:user_id", gradeController.getGrades);

module.exports = router;