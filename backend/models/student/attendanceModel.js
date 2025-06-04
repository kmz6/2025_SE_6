const db = require("../../config/db");

const attendanceModel = {
  getAttendanceMeta: async (lectureId) => {
    const [rows] = await db.query(`
      SELECT 
        c.course_name AS subject,
        CONCAT(c.course_year, '-', c.course_semester) AS yearSemester,
        CONCAT(c.credit, '학점 / ', c.credit, '시간') AS credit,
        GROUP_CONCAT(CONCAT(ct.course_day, ' ', ct.course_period, '교시') ORDER BY ct.course_day, ct.course_period SEPARATOR ', ') AS time,
        p.name AS professor
      FROM COURSE_TB c
      JOIN FACULTY_TB p ON c.faculty_id = p.faculty_id
      JOIN COURSE_TIME_TB ct ON ct.course_id = c.course_id
      WHERE c.course_id = ?
      GROUP BY c.course_id
    `, [lectureId]);

    return rows[0];
  },

  getAttendanceStatus: async (lectureId, studentId) => {
    const [rows] = await db.query(`
      SELECT attend_week, attend_session, attend_status, DATE_FORMAT(updated_at, '%m/%d') AS date
      FROM ATTEND_TB
      WHERE course_id = ? AND student_id = ?
    `, [lectureId, studentId]);

    return rows;
  },
};

module.exports = attendanceModel;