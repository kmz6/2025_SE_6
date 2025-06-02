const db = require("../config/db");

// 입력 받은 아이디, 비번으로 사용자 + 이름까지 가져옴 (학생, 교수, 직원 포함)
async function findUser(user_id, password) {
    const sql = `
      SELECT 
        u.user_id, 
        u.user_type, 
        COALESCE(s.name, f.name, t.name) AS name
      FROM USER_TB u
      LEFT JOIN STUDENT_TB s ON u.user_id = s.student_id
      LEFT JOIN FACULTY_TB f ON u.user_id = f.faculty_id
      LEFT JOIN STAFF_TB t ON u.user_id = t.staff_id
      WHERE u.user_id = ? AND u.password = ?
    `;

    const [results] = await db.query(sql, [user_id, password]);
    return results[0]; // 로그인 성공 시 user 객체 반환
}

module.exports = {
    findUser,
};