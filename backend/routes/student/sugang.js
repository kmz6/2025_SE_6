const express = require("express");
const router = express.Router();
const SugangController = require("../../controllers/student/sugangController");

// GET /sugang/search
router.get("/search", SugangController.searchCoursesByName);

// GET /sugang/registered
router.get("/registered", SugangController.getRegisteredCourses);

// POST /sugang/register
router.post("/register", SugangController.registerCourse);

// POST /sugang/delete
router.post("/delete", SugangController.deleteCourse);

module.exports = router;
