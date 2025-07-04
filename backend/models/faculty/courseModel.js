const db = require("../../config/db");

const CourseModel = {
  // 교수 강의 목록 조회
    getCoursesByFaculty: async (facultyId) => {
        const [rows] = await db.query(`
      SELECT * FROM COURSE_TB WHERE faculty_id = ?
    `, [facultyId]);
        return rows;
    },
    // 강의 상세 정보 조회
    getCourseByCode: async (courseCode) => {
        const [rows] = await db.query(`
    SELECT 
      c.course_code,
      c.course_name,
      c.course_type,
      c.credit,
      c.building,
      c.room,
      c.attendance,
      c.midterm_exam,
      c.final_exam,
      c.assignment,
      c.etc,
      c.course_year,
      c.course_semester,
      f.name AS faculty_name,
      CONCAT(RIGHT(LPAD(c.course_year, 4, '0'), 2), '-', c.course_semester) AS semester,
      GROUP_CONCAT(CONCAT(ct.course_day, ' ', ct.course_period, '교시') ORDER BY ct.course_day, ct.course_period SEPARATOR ', ') AS course_times
    FROM COURSE_TB c
    JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
    LEFT JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
    WHERE c.course_code = ?
    GROUP BY c.course_id
  `, [courseCode]);
        return rows[0];
    },
    // 강의 정보 업데이트
    updateCourse: async (courseCode, newData) => {
        const {
            building, room, attendance, midterm_exam, final_exam, assignment, course_year, course_semester, credit, etc
        } = newData;
        await db.query(`
      UPDATE COURSE_TB SET 
        building = ?, room = ?, attendance = ?, midterm_exam = ?, 
        final_exam = ?, assignment = ?, course_year = ?, course_semester = ?,
        credit = ?, etc = ?
      WHERE course_code = ?
    `, [building, room, attendance, midterm_exam, final_exam, assignment, course_year, course_semester, credit, etc, courseCode]);
    }
};

module.exports = CourseModel;