const db = require("../config/db");

// 사용자 유형 구분
exports.findUserType = async (user_id) => {
  const [rows] = await db.query(`SELECT user_type FROM USER_TB WHERE user_id = ?`, [user_id]);
  return rows[0]?.user_type || null;
};

// 사용자 정보 확인
exports.verifyUser = async (user_type, user_id, name, email) => {
  let table = user_type === 'student' ? 'STUDENT_TB' :
              user_type === 'faculty' ? 'FACULTY_TB' :
              'STAFF_TB';

  const idCol = user_type === 'student' ? 'student_id' :
                user_type === 'faculty' ? 'faculty_id' :
                'staff_id';

  const [rows] = await db.query(
    `SELECT * FROM ${table} WHERE ${idCol} = ? AND name = ? AND email = ?`,
    [user_id, name, email]
  );

  return rows.length > 0;
};

// 비밀번호 변경
exports.updatePassword = async (user_id, newPassword) => {
  await db.query(`UPDATE USER_TB SET password = ? WHERE user_id = ?`, [newPassword, user_id]);
};