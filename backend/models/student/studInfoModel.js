const db = require("../../config/db");

async function getInfo(user_id) {
    const sql = `SELECT name, student_id, department, enrollment_status
                FROM student_tb
                WHERE student_id = ?`;

    const [results] = await db.query(sql, [user_id]);

    return results[0];
}

module.exports = {
    getInfo,
};