const express = require("express");
const router = express.Router();
const gradeController = require("../../controllers/student/gradeController");

// GET /grade/semester/${user_id}
router.get("/semester/:user_id", gradeController.getSemesters);

// GET /grade/${user_id}/${year}/${semester}
router.get("/:user_id", gradeController.getGrades);

// GET /grade/credit/${user_id}
router.get("/credit/:user_id", gradeController.getCredits);

// GET /grade/gpa/${user_id}
router.get("/gpa/:user_id", gradeController.getGpas);

module.exports = router;