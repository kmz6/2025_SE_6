const db = require("../config/db");

exports.findUserById = async (userId) => {
  try {
    // 학생
    const [student] = await db.query(
      "SELECT * FROM STUDENT_TB WHERE student_id = ?",
      [userId]
    );
    if (student.length > 0) {
      return { userType: "student", userInfo: student[0] };
    }

    // 교수
    const [faculty] = await db.query(
      "SELECT * FROM FACULTY_TB WHERE faculty_id = ?",
      [userId]
    );
    if (faculty.length > 0) {
      return { userType: "faculty", userInfo: faculty[0] };
    }

    // 교직원
    const [staff] = await db.query(
      "SELECT * FROM STAFF_TB WHERE staff_id = ?",
      [userId]
    );
    if (staff.length > 0) {
      return { userType: "staff", userInfo: staff[0] };
    }

    return null;
  } catch (err) {
    console.error("DB 조회 중 에러 발생", err);
    throw err;
  }
};
