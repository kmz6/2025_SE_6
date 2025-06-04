const db = require("../../config/db");

// 수강생 + 출석 상태 불러오기
exports.getStudentsWithAttendance = async (req, res) => {
  const { courseId } = req.params;
  const { week, session } = req.query;

  try {
    const [students] = await db.query(
      `SELECT s.student_id, s.name, a.attend_status
       FROM STUDENT_TB s
       JOIN STUD_COURSE_TB e ON s.student_id = e.student_id
       LEFT JOIN ATTEND_TB a ON s.student_id = a.student_id 
         AND a.course_id = ? AND a.attend_week = ? AND a.attend_session = ?
       WHERE e.course_id = ?`,
      [courseId, week, session, courseId]
    );

    res.json(students);
  } catch (err) {
    console.error("출석 목록 불러오기 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 출석 저장하기
exports.saveAttendance = async (req, res) => {
  const { courseId } = req.params;
  const { week, session, records } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 기존 데이터 삭제
    await conn.query(
      `DELETE FROM ATTEND_TB WHERE course_id = ? AND attend_week = ? AND attend_session = ?`,
      [courseId, week, session]
    );

    // 새 데이터 삽입
    for (const rec of records) {
      await conn.query(
        `INSERT INTO ATTEND_TB (course_id, student_id, attend_week, attend_session, attend_status)
         VALUES (?, ?, ?, ?, ?)`,
        [courseId, rec.student_id, week, session, rec.status]
      );
    }

    await conn.commit();
    res.status(200).json({ message: "출석 저장 성공" });
  } catch (err) {
    await conn.rollback();
    console.error("출석 저장 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  } finally {
    conn.release();
  }
};