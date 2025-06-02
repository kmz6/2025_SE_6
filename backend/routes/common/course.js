const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.get('/:lectureId', async (req, res) => {
  const { lectureId } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT c.course_id, c.course_name, c.course_code, c.course_year, c.course_semester, 
             c.credit, c.building, c.room,
             f.faculty_name
      FROM COURSE_TB c
      JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
      WHERE c.course_id = ?
    `, [lectureId]);

    if (rows.length === 0) return res.status(404).json({ message: '강의를 찾을 수 없습니다' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
