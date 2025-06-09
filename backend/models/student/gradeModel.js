const db = require("../../config/db");

//학기 정보
async function findSemestersById(user_id) {
    const sql = `SELECT DISTINCT c.course_year, c.course_semester
                    FROM COURSE_TB c JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id
                    WHERE sc.student_id = ?
                    ORDER BY c.course_year DESC, c.course_semester DESC;`;

    const [results] = await db.query(sql, [user_id]);

    return results;
}

//학기에 해당하는 과목 성적
async function findGrades(user_id) {
    const sql = `SELECT c.course_id, c.course_year, c.course_semester, c.course_code, c.course_name, c.course_type, c.credit, sc.grade
                    FROM COURSE_TB c JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id
                    WHERE sc.student_id = ?
                    ORDER BY c.course_year DESC, c.course_semester DESC, c.course_code;`

    const [results] = await db.query(sql, [user_id]);

    return results;
}

// 학점 수 정보 요청
async function countCredits(user_id) {
    const sql = `SELECT c.course_type, SUM(c.credit) total_credit
                    FROM STUD_COURSE_TB sc JOIN COURSE_TB c ON sc.course_id = c.course_id
                    WHERE sc.student_id = ? AND sc.grade <> 'N/A'
                    GROUP BY c.course_type;`

    const [results] = await db.query(sql, [user_id]);

    return results;
}

// 학점별 수 정보 요청
async function countGrades(user_id) {
    const sql = `SELECT grade, COUNT(*) count
                    FROM STUD_COURSE_TB
                    WHERE student_id = ? AND grade <> 'N/A'
                    GROUP BY grade;`

    const [results] = await db.query(sql, [user_id]);

    return results;
}


module.exports = {
    findSemestersById,
    findGrades,
    countCredits,
    countGrades
};