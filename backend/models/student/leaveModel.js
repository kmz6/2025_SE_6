const db = require("../../config/db");

// 휴복학 정보
async function findLeaveById(user_id) {
    const sql = `SELECT request_id, request_type, request_date, status
                    FROM LEAVE_TB
                    WHERE student_id = ?
                    ORDER BY request_date DESC;`;

    const [results] = await db.query(sql, [user_id]);

    return results;
}

// 휴복학 신청
async function insertRequest(user_id, request_type) {

    // 중복 요청 방지
    const existSql = `SELECT * FROM LEAVE_TB WHERE student_id = ? AND status = 'pending'`;
    const [existing] = await db.query(existSql, [user_id]);

    //이미 대기 중인 요청이 있는 경우
    if (existing.length > 0) {
        throw new Error('대기 중인 휴복학 요청이 있습니다.');
    }


    const sql = `INSERT INTO LEAVE_TB(student_id, request_type)
                    VALUES (?, ?)`;

    const [results] = await db.query(sql, [user_id, request_type]);
}

module.exports = {
    findLeaveById,
    insertRequest
};