const db = require("../../config/db");

const lecturelistModel = {
    getCoursesByStudent: async (studentId) => {
        const [rows] = await db.query(`
      SELECT 
        c.course_id,
        c.course_name,
        c.course_year,
        c.course_semester,
        CONCAT(RIGHT(LPAD(c.course_year, 4, '0'), 2), '-', c.course_semester) AS semester,
        GROUP_CONCAT(CONCAT(ct.course_day, ' ', ct.course_period, '교시') ORDER BY ct.course_day, ct.course_period SEPARATOR ', ') AS course_times
      FROM COURSE_TB c
      JOIN STUD_COURSE_TB ce ON c.course_id = ce.course_id
      LEFT JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
      WHERE ce.student_id = ?
      GROUP BY c.course_id
    `, [studentId]);
        return rows;
    }
};

module.exports = lecturelistModel;