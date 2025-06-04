const db = require("../../config/db");

// 교수 강의 정보
async function findCoursesById(user_id) {
    const sql = `SELECT *
                    FROM COURSE_TB
                    WHERE faculty_id = ? AND course_year = 2025 AND course_semester = 1
                    ORDER BY course_name DESC;`;

    const [results] = await db.query(sql, [user_id]);

    return results;
}

// 강의 정보
async function findCourseInfoById(course_id) {
    const sql = `SELECT *
                    FROM COURSE_TB
                    WHERE course_id = ?`;

    const [results] = await db.query(sql, [course_id]);

    return results[0];
}

// 학생 정보
async function findStudentInfoById(course_id) {
    const sql = `SELECT s.department, s.name, sc.*
                    FROM STUD_COURSE_TB sc JOIN STUDENT_TB s ON sc.student_id = s.student_id
                    WHERE sc.course_id = ?
                    ORDER BY sc.student_id;`;

    const [results] = await db.query(sql, [course_id]);

    return results;
}

module.exports = {
    findCoursesById,
    findCourseInfoById,
    findStudentInfoById,
};