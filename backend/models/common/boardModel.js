const db = require("../../config/db");

// 게시글 등록
async function insertById(data, files) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // board_tb에 게시글 등록
        const boardSql = `INSERT INTO BOARD_TB (course_id, title, content, author_id, board_type)
                            VALUES (?, ?, ?, ?, ?)`;

        const [result] = await connection.query(boardSql, data)
        const postId = await result.insertId;

        const attachSql = `INSERT INTO ATTACHMENT_TB (post_id, file_name, file_path)
                            VALUES (?, ?, ?)`;

        for (const file of files) {
            await connection.query(attachSql, [postId, file.filename, `uploads/${file.filename}`]);
        }

        await connection.commit();
    }
    catch (error) {
        await connection.rollback();

        throw error;
    }
    finally {
        connection.release();
    }
}

// 게시글 삭제
async function deleteById(postId) {
    const sql = `DELETE FROM BOARD_TB
                    WHERE post_id = ?;`;

    const [results] = await db.query(sql, [postId]);

    return results;
}

module.exports = {
    insertById,
    deleteById
}
