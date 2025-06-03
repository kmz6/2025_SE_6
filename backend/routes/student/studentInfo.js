const express = require("express");
const router = express.Router();
const infoController = require("../../controllers/student/studInfoController");

// GET /studInfo/${user_id}
router.get("/:user_id", infoController.findStudent);

module.exports = router;