const express = require("express");
const router = express.Router();
const timetableController = require("../../controllers/timetableController");

router.get("/:student_id", timetableController.getTimetable);

module.exports = router;