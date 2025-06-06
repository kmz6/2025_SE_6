const express = require("express");
const router = express.Router();
const db = require("../../config/db");

const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../", "uploads")); // 파일 업로드 위치
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext); // 파일명
  }
})
var upload = multer({ storage: storage });

// list
router.get('/lectures/:courseId/materials', async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT b.post_id AS id, b.title, b.author_id AS author, f.name, 
              DATE_FORMAT(b.created_at, "%Y-%m-%d") AS date
       FROM BOARD_TB b JOIN FACULTY_TB f ON b.author_id = f.faculty_id
       WHERE course_id = ? AND board_type = 'material'
       ORDER BY created_at DESC`,
      [courseId]
    );

    res.json(rows);
  } catch (error) {
    console.error("DB 오류:", error);
    res.status(500).json({ message: "자료실 불러오기 실패" });
  }
});

// post
router.get('/lectures/:courseId/materials/:postId', async (req, res) => {
  const { courseId, postId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT b.post_id, b.title, b.author_id, f.name, b.content, 
              DATE_FORMAT(b.created_at, "%Y-%m-%d") AS created_at
       FROM BOARD_TB b JOIN FACULTY_TB f ON b.author_id = f.faculty_id
       WHERE b.course_id = ? AND b.post_id = ? AND b.board_type = 'material'`,
      [courseId, postId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("자료실 상세 조회 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

// search lecture name
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

// archive write
router.post('/lectures/:courseId/materials', upload.array('many'), async (req, res) => {
  const { courseId } = req.params;
  const { title, content, author_id } = req.body;

  const files = req.files;

  try {
    const boardSql = `INSERT INTO BOARD_TB (course_id, title, content, author_id, board_type)
       VALUES (?, ?, ?, ?, 'material')`;

    const attachSql = `INSERT INTO ATTACHMENT_TB (post_id, file_name, file_path)
      VALUES (?, ?, ?)`;

    const [result] = await db.execute(boardSql, [courseId, title, content, author_id]);
    const postId = result.insertId;

    for (const file of files) {
      await db.execute(attachSql, [postId, file.filename, `uploads/${file.filename}`]);
    }

    res.status(201).json({ message: "자료 등록 성공" });
  } catch (err) {
    console.error("자료 등록 오류:", err);
    res.status(500).json({ message: "자료 등록 실패" });
  }
});

// archive DELETE
router.delete('/lectures/:courseId/materials/:postId', async (req, res) => {
  const { courseId, postId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM BOARD_TB 
       WHERE course_id = ? AND post_id = ? AND board_type = 'material'`,
      [courseId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
    }

    res.json({ message: "삭제 성공" });
  } catch (err) {
    console.error("자료 삭제 오류:", err);
    res.status(500).json({ message: "자료 삭제 실패" });
  }
});

// archive edit
router.put('/lectures/:courseId/materials/:postId', async (req, res) => {
  const { courseId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE BOARD_TB
       SET title = ?, content = ?
       WHERE course_id = ? AND post_id = ? AND board_type = 'material'`,
      [title, content, courseId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "수정할 게시글이 없습니다." });
    }

    res.json({ message: "자료 수정 완료" });
  } catch (err) {
    console.error("자료 수정 오류:", err);
    res.status(500).json({ message: "자료 수정 실패" });
  }
});

module.exports = router;
