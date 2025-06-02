const db = require("../config/db");

// USER_TB에 사용자 저장
async function insertUser(user_id, password, user_type) {
    const sql = `INSERT INTO USER_TB (user_id, password, user_type) VALUES (?, ?, ?)`;
    await db.query(sql, [user_id, password, user_type]);
}

// STUDENT_TB에 학생 정보 저장
async function insertStudent(student_id, name, enrollment_status, college, department, telephone, email) {
    const sql = `
        INSERT INTO STUDENT_TB 
        (student_id, name, enrollment_status, college, department, telephone, email)
        VALUES (?, ?, 'enrolled', ?, ?, ?, ?)
    `;
    await db.query(sql, [student_id, name, enrollment_status, college, department, telephone, email]);
}

// FACULTY_TB에 교수 정보 저장
async function insertFaculty(faculty_id, name, college, department, telephone, email) {
    const sql = `
        INSERT INTO FACULTY_TB 
        (faculty_id, name, college, department, telephone, email)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [faculty_id, name, college, department, telephone, email]);
}

module.exports = {
    insertUser,
    insertStudent,
    insertFaculty,
};