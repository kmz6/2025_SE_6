const db = require("../../config/db");

const profAttendanceModel = {
  getStudentsWithAttendance: async (courseId, week, session) => {
    const [rows] = await db.query(
      `SELECT s.student_id, s.name, a.attend_status
       FROM STUDENT_TB s
       JOIN STUD_COURSE_TB e ON s.student_id = e.student_id
       LEFT JOIN ATTEND_TB a ON s.student_id = a.student_id 
         AND a.course_id = ? AND a.attend_week = ? AND a.attend_session = ?
       WHERE e.course_id = ?`,
      [courseId, week, session, courseId]
    );
    return rows;
  },

  saveAttendance: async (courseId, week, session, records) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query(
        `DELETE FROM ATTEND_TB WHERE course_id = ? AND attend_week = ? AND attend_session = ?`,
        [courseId, week, session]
      );

      for (const rec of records) {
        await conn.query(
          `INSERT INTO ATTEND_TB (course_id, student_id, attend_week, attend_session, attend_status)
           VALUES (?, ?, ?, ?, ?)`,
          [courseId, rec.student_id, week, session, rec.status]
        );
      }

      await conn.commit();
      return { message: "출석 저장 성공" };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};

module.exports = profAttendanceModel;