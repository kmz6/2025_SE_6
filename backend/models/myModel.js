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

exports.updateUserInfo = async (userId, { telephone, email }) => {
  const [rows] = await db.query(
    `
    SELECT
      CASE
        WHEN EXISTS (SELECT 1 FROM STUDENT_TB WHERE student_id = ?) THEN 'student'
        WHEN EXISTS (SELECT 1 FROM FACULTY_TB WHERE faculty_id = ?) THEN 'faculty'
        WHEN EXISTS (SELECT 1 FROM STAFF_TB WHERE staff_id = ?) THEN 'staff'
        ELSE NULL
      END AS userType
    `,
    [userId, userId, userId]
  );

  const userRow = rows[0];
  if (!userRow || !userRow.userType) return null;

  const tableMap = {
    student: "STUDENT_TB",
    faculty: "FACULTY_TB",
    staff: "STAFF_TB",
  };

  const table = tableMap[userRow.userType];
  if (!table) return null;

  const [userInfos] = await db.query(
    `SELECT telephone, email FROM ${table} WHERE ${userRow.userType}_id = ?`,
    [userId]
  );

  if (userInfos.length === 0) return null;

  const current = userInfos[0];

  const newTelephone =
    telephone !== undefined && telephone !== null && telephone !== ""
      ? telephone
      : current.telephone;

  const newEmail =
    email !== undefined && email !== null && email !== ""
      ? email
      : current.email;

  await db.query(
    `UPDATE ${table} SET telephone = ?, email = ? WHERE ${userRow.userType}_id = ?`,
    [newTelephone, newEmail, userId]
  );

  return { telephone: newTelephone, email: newEmail };
};
