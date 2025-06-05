const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// course_id → course_code 변환
router.get("/:courseId/code", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [[result]] = await db.query("SELECT course_code FROM COURSE_TB WHERE course_id = ?", [courseId]);
    if (!result) return res.status(404).json({ error: "해당 강의 없음" });
    res.json(result); // course_code
  } catch (err) {
    console.error("변환 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;