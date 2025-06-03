const db = require("../../config/db");

// 학생의 학과 정보
async function findMajorById(student_id) {
    const sql = `SELECT department FROM STUDENT_TB WHERE student_id = ?`;
    const [results] = await db.query(sql, [student_id]);
    return results[0];
}

// 같은 학과, 같은 학기 학생의 성적 정보
async function findGradesBySemester(department, year, semester) {
    const sql = `
        SELECT sc.student_id, c.course_year, c.course_semester, sc.grade, c.credit
        FROM STUD_COURSE_TB sc
        JOIN COURSE_TB c ON sc.course_id = c.course_id
        JOIN STUDENT_TB s ON sc.student_id = s.student_id
        WHERE s.department = ? AND c.course_year = ? AND c.course_semester = ?;
    `;

    const [results] = await db.query(sql, [department, year, semester]);
    return results;
}

module.exports = {
    findMajorById,
    findGradesBySemester
};