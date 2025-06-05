const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/:facultyId/lectures", async (req, res) => {
  const { facultyId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT c.course_id, c.course_name, c.course_code, c.course_year, c.course_semester
       FROM COURSE_TB c
       WHERE c.faculty_id = ?`, 
      [facultyId]
    );

    res.json(rows);  
  } catch (error) {
    console.error("강의 목록 조회 오류:", error);
    res.status(500).json({ message: "강의 목록 조회 실패" });
  }
});

module.exports = router;
