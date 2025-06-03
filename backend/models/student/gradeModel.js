const db = require("../../config/db");

//학기 정보
async function findSemestersById(user_id) {
    const sql = `SELECT DISTINCT course_year, course_semester
                    FROM COURSE_TB c JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id
                    WHERE sc.student_id = ?
                    ORDER BY course_year DESC, course_semester DESC;`;

    const [results] = await db.query(sql, [user_id]);

    return results;
}

//학기에 해당하는 과목 성적
async function findGrades(user_id, year, semester) {
    const sql = `SELECT c.course_id, c.course_year, c.course_semester, c.course_code, c.course_name, c.course_type, c.credit, sc.grade
                    FROM COURSE_TB c JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id
                    WHERE sc.student_id = ?
                    ORDER BY c.course_year DESC, c.course_semester DESC, c.course_code;`

    const [results] = await db.query(sql, [user_id, year, semester]);

    return results;
}

module.exports = {
    findSemestersById,
    findGrades
};