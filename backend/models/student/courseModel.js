const db = require("../../config/db");

const CourseModel = {
  // 모든 강의 정보 조회
    getAllCourses: async () => {
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
        c.faculty_id,
        c.course_year,
        c.course_semester,
        f.name AS faculty_name
      FROM COURSE_TB c
      JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
    `);
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
      c.faculty_id,
      c.course_year,
      c.course_semester,
      f.name AS faculty_name,
      GROUP_CONCAT(CONCAT(ct.course_day, ' ', ct.course_period, '교시') ORDER BY FIELD(ct.course_day, '월','화','수','목','금','토','일'), ct.course_period SEPARATOR ', ') AS course_times
    FROM COURSE_TB c
    JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
    LEFT JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
    WHERE c.course_code = ?
    GROUP BY c.course_id
  `, [courseCode]);
        return rows[0];
    }

};

module.exports = CourseModel;