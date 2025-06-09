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

// 게시글 수정
async function updateById(title, content, files, postId) {
    const connection = await db.getConnection();
    let affectedRows;

    try {
        await connection.beginTransaction();

        // board_tb 게시글 수정
        const boardSql = `UPDATE BOARD_TB
                SET title = ?, content = ?
                WHERE post_id = ?`;

        const [result] = await connection.execute(boardSql, [title, content, postId]);
        affectedRows = result.affectedRows;

        if (files.length > 0) {
            // attachment_tb 기존 첨부파일 삭제
            const deleteSql = `DELETE FROM ATTACHMENT_TB
                            WHERE post_id = ?`;

            await connection.execute(deleteSql, [postId]);

            // attachment_tb 추가
            const attachSql = `INSERT INTO ATTACHMENT_TB (post_id, file_name, file_path)
                            VALUES (?, ?, ?)`;

            for (const file of files) {
                await connection.query(attachSql, [postId, file.filename, `uploads/${file.filename}`]);
            }
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

    return affectedRows;
}

// 첨부파일 목록
async function getAttachById(postId) {
    const sql = `SELECT *
                    FROM ATTACHMENT_TB
                    WHERE post_id = ?`;

    const [results] = await db.query(sql, [postId]);

    return results;
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
    updateById,
    getAttachById,
    deleteById
}
