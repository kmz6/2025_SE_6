const db = require("../../config/db");

// 대기 중인 요청 건수
async function leaveCount() {
    const sql = `SELECT COUNT(*) count
                    FROM LEAVE_TB
                    WHERE status = 'pending';`

    const [results] = await db.query(sql);
    return results[0];
}

// 휴복학 정보 전체 가져오기
async function findLeaveAll() {
    const sql = `SELECT s.student_id, s.name, l.request_id, l.request_type, l.request_date, l.status
                    FROM STUDENT_TB s
                    JOIN LEAVE_TB l ON s.student_id = l.student_id
                    ORDER BY request_date DESC;`;

    const [results] = await db.query(sql);

    return results;
}

// 승인 (학생 정보, 휴복학 정보 업데이트)
async function leaveApprove(reqId, reqStatus) {
    const connection = await db.getConnection();

    try {
        // 트랜잭션으로 실패하면 모두 반영되지 않도록 설정
        await connection.beginTransaction();

        // 승인 상태 반영
        const leaveSql = `UPDATE LEAVE_TB
                    SET status = 'approved'
                    WHERE request_id = ?;`;

        await connection.query(leaveSql, [reqId]);

        // 학생의 휴복학 정보 변경
        const studentSql = `UPDATE STUDENT_TB
                            SET enrollment_status = ?
                            WHERE student_id = (
                                SELECT student_id
                                FROM LEAVE_TB
                                WHERE request_id = ?
                            )`;
        await connection.query(studentSql, [reqStatus, reqId]);

        await connection.commit();
    }
    catch (error) {
        await connection.rollback(); // 실패하면 롤백
        throw error;
    }
    finally {
        connection.release();
    }
}

// 반려 (휴복학 정보 업데이트)
async function leaveReject(reqId) {
    const sql = `UPDATE LEAVE_TB
                    SET status = 'rejected'
                    WHERE request_id = ?;`;

    const [results] = await db.query(sql, [reqId]);

    return results;
}

module.exports = {
    leaveCount,
    findLeaveAll,
    leaveApprove,
    leaveReject
}
