const db = require("../../config/db");

const SugangModel = {
  // 과목 검색 시 조회
  searchCoursesByName: async (courseName, studentId) => {
    const [rows] = await db.query(
      `
      SELECT 
        c.course_id,
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
        ct.course_day,
        ct.course_period,
        CASE WHEN sc.student_id IS NULL THEN 0 ELSE 1 END AS is_registered
      FROM COURSE_TB c
      JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
      LEFT JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
      LEFT JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id AND sc.student_id = ?
      WHERE c.course_name LIKE ?
      ORDER BY c.course_id, 
               FIELD(ct.course_day, '월','화','수','목','금','토','일'),
               ct.course_period
    `,
      [studentId, `%${courseName}%`]
    );

    console.log("검색 결과", rows);

    const courseMap = new Map();

    rows.forEach((row) => {
      const {
        course_id,
        course_code,
        course_name,
        course_type,
        credit,
        building,
        room,
        attendance,
        midterm_exam,
        final_exam,
        assignment,
        etc,
        faculty_id,
        course_year,
        course_semester,
        faculty_name,
        course_day,
        course_period,
        is_registered,
      } = row;

      if (!courseMap.has(course_id)) {
        courseMap.set(course_id, {
          course_id,
          course_code,
          course_name,
          course_type,
          credit,
          building,
          room,
          attendance,
          midterm_exam,
          final_exam,
          assignment,
          etc,
          faculty_id,
          course_year,
          course_semester,
          faculty_name,
          is_registered: is_registered === 1,
          course_times: [],
        });
      }

      if (course_day && course_period) {
        courseMap.get(course_id).course_times.push({
          course_day,
          course_period,
        });
      }
    });

    return Array.from(courseMap.values());
  },

  // 신청한 과목 목록 조회
  getRegisteredCourses: async (studentId) => {
    const [rows] = await db.query(
      `
      SELECT 
        c.course_id,
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
        ct.course_day,
        ct.course_period
      FROM STUD_COURSE_TB sc
      JOIN COURSE_TB c ON sc.course_id = c.course_id
      JOIN FACULTY_TB f ON c.faculty_id = f.faculty_id
      LEFT JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
      WHERE sc.student_id = ?
      ORDER BY c.course_id,
               FIELD(ct.course_day, '월','화','수','목','금','토','일'),
               ct.course_period
    `,
      [studentId]
    );

    const courseMap = new Map();

    rows.forEach((row) => {
      const {
        course_id,
        course_code,
        course_name,
        course_type,
        credit,
        building,
        room,
        attendance,
        midterm_exam,
        final_exam,
        assignment,
        etc,
        faculty_id,
        course_year,
        course_semester,
        faculty_name,
        course_day,
        course_period,
      } = row;

      if (!courseMap.has(course_id)) {
        courseMap.set(course_id, {
          course_id,
          course_code,
          course_name,
          course_type,
          credit,
          building,
          room,
          attendance,
          midterm_exam,
          final_exam,
          assignment,
          etc,
          faculty_id,
          course_year,
          course_semester,
          faculty_name,
          course_times: [],
        });
      }

      if (course_day && course_period) {
        courseMap.get(course_id).course_times.push({
          course_day,
          course_period,
        });
      }
    });

    return Array.from(courseMap.values());
  },

  // 수강신청
  registerCourse: async (studentId, courseId) => {
    // 중복 체크
    const [existing] = await db.query(
      `SELECT * FROM STUD_COURSE_TB WHERE student_id = ? AND course_id = ?`,
      [studentId, courseId]
    );

    if (existing.length > 0) {
      throw new Error("이미 신청한 과목입니다.");
    }

    // 수강신청
    await db.query(
      `INSERT INTO STUD_COURSE_TB (student_id, course_id) VALUES (?, ?)`,
      [studentId, courseId]
    );
  },

  // 수강삭제
  deleteCourse: async (studentId, courseId) => {
    await db.query(
      `DELETE FROM STUD_COURSE_TB WHERE student_id = ? AND course_id = ?`,
      [studentId, courseId]
    );
  },
};

module.exports = SugangModel;
