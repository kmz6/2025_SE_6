const express = require("express");
const router = express.Router();
const submissionController = require("../../controllers/student/dashboardController");

// GET /dashboard/assignment
router.get("/assignment", submissionController.getStudentSubmissions);

module.exports = router;
