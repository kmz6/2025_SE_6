const db = require("../../config/db");

exports.updateCourseByCode = async (courseCode, updatedData) => {
  const {
    building,
    room,
    attendance,
    midterm_exam,
    final_exam,
    assignment,
    etc,
    credit,
    course_year,
    course_semester,
    course_times,
  } = updatedData;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // COURSE_TB 업데이트
    await conn.query(`
      UPDATE COURSE_TB
      SET building = ?, 
          room = ?, 
          attendance = ?, 
          midterm_exam = ?, 
          final_exam = ?,
          assignment = ?, 
          etc = ?, 
          credit = ?, 
          course_year = ?, 
          course_semester = ?
      WHERE course_code = ?`,
      [
        building,
        room,
        attendance,
        midterm_exam,
        final_exam,
        assignment,
        etc,
        credit,
        course_year,
        course_semester,
        courseCode,
      ]
    );

    // course_id 조회
    const [[courseRow]] = await conn.query(
      `SELECT course_id FROM COURSE_TB WHERE course_code = ?`,
      [courseCode]
    );
    const courseId = courseRow.course_id;

    // 기존 COURSE_TIME_TB 삭제
    await conn.query(
      `DELETE FROM COURSE_TIME_TB WHERE course_id = ?`,
      [courseId]
    );

    // course_times 삽입
    const times = course_times.split(",").map((timeStr) => {
      const [day, periodStr] = timeStr.trim().split(" ");
      const period = parseInt(periodStr.replace("교시", ""));
      return [courseId, day, period];
    });

    if (times.length > 0) {
      await conn.query(
        `INSERT INTO COURSE_TIME_TB (course_id, course_day, course_period) VALUES ?`,
        [times]
      );
    }

    await conn.commit();
    return { affectedRows: 1 };
  } catch (err) {
    await conn.rollback();
    console.error("업데이트 실패:", err);
    throw err;
  } finally {
    conn.release();
  }
};