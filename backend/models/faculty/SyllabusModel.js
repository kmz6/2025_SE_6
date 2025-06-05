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
  } = updatedData;

  const [result] = await db.query(`
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

  return result;
};