const express = require("express");
const router = express.Router();
const memberController = require("../../controllers/staff/memberController");

// POST /staff/member
router.post("/member", memberController.addMember);

// DELETE /staff/member
router.delete("/member/:staffId", memberController.deleteMember);

module.exports = router;
