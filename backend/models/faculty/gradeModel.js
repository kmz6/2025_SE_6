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

module.exports = {
    findCoursesById
};