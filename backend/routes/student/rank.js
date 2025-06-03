const express = require("express");
const router = express.Router();
const rankController = require("../../controllers/student/rankController");

// GET /rank/${user_id}
router.get("/:user_id", rankController.getSemData);

module.exports = router;