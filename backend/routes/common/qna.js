const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get('/lectures/:courseId/qna', async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT b.post_id AS id, b.title, b.author_id AS author, s.name,
              DATE_FORMAT(b.created_at, "%Y-%m-%d") AS date
       FROM BOARD_TB b JOIN STUDENT_TB s ON b.author_id = s.student_id
       WHERE b.course_id = ? AND b.board_type = 'qna'
       ORDER BY b.created_at DESC`,
      [courseId]
    );

    res.json(rows);
  } catch (error) {
    console.error("DB 오류:", error);
    res.status(500).json({ message: "QnA 게시판 불러오기 실패" });
  }
});

router.get('/lectures/:courseId/qna/:postId', async (req, res) => {
  const { courseId, postId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT b.post_id, b.title, b.author_id, s.name, b.content, 
              DATE_FORMAT(b.created_at, "%Y-%m-%d") AS created_at
       FROM BOARD_TB b JOIN STUDENT_TB s ON b.author_id = s.student_id
       WHERE b.course_id = ? AND b.post_id = ? AND b.board_type = 'qna'`,
      [courseId, postId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("QnA 상세 조회 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

router.get('/lectures/:courseId/info', async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT course_name, course_code
       FROM COURSE_TB
       WHERE course_id = ?`,
      [courseId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "과목을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("과목명 조회 실패:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

router.put('/lectures/:courseId/qna/:postId', async (req, res) => {
  const { courseId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE BOARD_TB
       SET title = ?, content = ?
       WHERE course_id = ? AND post_id = ? AND board_type = 'qna'`,
      [title, content, courseId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "수정할 게시글이 없습니다." });
    }

    res.json({ message: "QnA 게시글 수정 완료" });
  } catch (err) {
    console.error("QnA 수정 오류:", err);
    res.status(500).json({ message: "QnA 게시글 수정 실패" });
  }
});

router.get('/lectures/:courseId/qna/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT
        c.comment_id,
        c.post_id,
        c.author_id,
        COALESCE(s.name, f.name, st.name, c.author_id) AS author_name,
        c.content,
        c.created_at,
        c.updated_at
      FROM QA_COMMENT_TB c
      LEFT JOIN STUDENT_TB s ON c.author_id = s.student_id
      LEFT JOIN FACULTY_TB f ON c.author_id = f.faculty_id
      LEFT JOIN STAFF_TB st ON c.author_id = st.staff_id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC`,
      [postId]
    );
    res.json(rows);
  } catch (err) {
    console.error("댓글 조회 오류:", err);
    res.status(500).json({ message: "댓글 조회 실패" });
  }
});

router.post('/lectures/:courseId/qna/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { author_id, content } = req.body;

  try {
    await db.execute(
      `INSERT INTO QA_COMMENT_TB (post_id, author_id, content) VALUES (?, ?, ?)`,
      [postId, author_id, content]
    );
    res.status(201).json({ message: "댓글 작성 성공" });
  } catch (err) {
    console.error("댓글 작성 오류:", err);
    res.status(500).json({ message: "댓글 작성 실패" });
  }
});

router.put('/lectures/:courseId/qna/:postId/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE QA_COMMENT_TB SET content = ? WHERE comment_id = ?`,
      [content, commentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "수정할 댓글이 없습니다." });
    }

    res.json({ message: "댓글 수정 성공" });
  } catch (err) {
    console.error("댓글 수정 오류:", err);
    res.status(500).json({ message: "댓글 수정 실패" });
  }
});


router.delete('/lectures/:courseId/qna/:postId/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM QA_COMMENT_TB WHERE comment_id = ?`,
      [commentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "삭제할 댓글이 없습니다." });
    }

    res.json({ message: "댓글 삭제 성공" });
  } catch (err) {
    console.error("댓글 삭제 오류:", err);
    res.status(500).json({ message: "댓글 삭제 실패" });
  }
});

module.exports = router;
