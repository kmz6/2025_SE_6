const db = require("../../config/db");

// 대기 중인 휴복학 정보 전체 가져오기
async function findLeaveAll() {
    const sql = `SELECT s.student_id, s.name, l.request_type, l.request_date, l.status
                    FROM STUDENT_TB s
                    JOIN LEAVE_TB l ON s.student_id = l.student_id
                    ORDER BY request_date DESC;`;

    const [results] = await db.query(sql);

    return results;
}

module.exports = {
    findLeaveAll
}
