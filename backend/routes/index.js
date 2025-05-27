const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("백엔드 테스트");
});

module.exports = router;
