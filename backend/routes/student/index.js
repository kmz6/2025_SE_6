const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/:studentId/lectures", async (req, res) => {
  const { studentId } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT c.course_id, c.course_name, c.course_year, c.course_semester
      FROM STUD_COURSE_TB sc
      JOIN COURSE_TB c ON sc.course_id = c.course_id
      WHERE sc.student_id = ?
    `, [studentId]);

    res.json(rows);
  } catch (err) {
    console.error("수강 과목 조회 실패:", err);
    res.status(500).json({ error: "수강 과목 조회 중 오류 발생" });
  }
});

module.exports = router;
