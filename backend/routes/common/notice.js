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

router.get('/lectures/:courseId/notices', async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT post_id AS id, title, author_id AS author,
              DATE_FORMAT(created_at, "%Y-%m-%d") AS date
       FROM BOARD_TB
       WHERE course_id = ? AND board_type = 'notice'
       ORDER BY created_at DESC`,
      [courseId]
    );

    res.json(rows);
  } catch (error) {
    console.error("DB 오류:", error);
    res.status(500).json({ message: "공지사항 불러오기 실패" });
  }
});

module.exports = router;

// PostPage
router.get('/lectures/:courseId/notices/:postId', async (req, res) => {
  const { courseId, postId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT post_id, title, author_id, content, 
              DATE_FORMAT(created_at, "%Y-%m-%d") AS created_at
       FROM BOARD_TB
       WHERE course_id = ? AND post_id = ? AND board_type = 'notice'`,
      [courseId, postId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("공지사항 상세 조회 오류:", err);
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

// WritePage
router.post('/lectures/:courseId/notices', upload.array('many'), async (req, res) => {
  const { courseId } = req.params;
  const { title, content, author_id } = req.body;

  const files = req.files;

  console.log(files);

  try {
    const boardSql = `INSERT INTO BOARD_TB (course_id, title, content, author_id, board_type)
       VALUES (?, ?, ?, ?, 'notice')`;

    const attachSql = `INSERT INTO ATTACHMENT_TB (post_id, file_name, file_path)
      VALUES (?, ?, ?)`;

    const [result] = await db.execute(boardSql, [courseId, title, content, author_id]);
    const postId = result.insertId;

    for (const file of files) {
      await db.execute(attachSql, [postId, file.filename, `uploads/${file.filename}`]);
    }

    res.status(201).json({ message: "공지사항 등록 성공" });
  } catch (err) {
    console.error("공지사항 등록 오류:", err);
    res.status(500).json({ message: "공지사항 등록 실패" });
  }
});

// DELETE
router.delete('/lectures/:courseId/notices/:postId', async (req, res) => {
  const { courseId, postId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM BOARD_TB 
       WHERE course_id = ? AND post_id = ? AND board_type = 'notice'`,
      [courseId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
    }

    res.json({ message: "삭제 성공" });
  } catch (err) {
    console.error("공지사항 삭제 오류:", err);
    res.status(500).json({ message: "공지사항 삭제 실패" });
  }
});

// edit
router.put('/lectures/:courseId/notices/:postId', async (req, res) => {
  const { courseId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE BOARD_TB
       SET title = ?, content = ?
       WHERE course_id = ? AND post_id = ? AND board_type = 'notice'`,
      [title, content, courseId, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "수정할 게시글이 없습니다." });
    }

    res.json({ message: "공지사항 수정 완료" });
  } catch (err) {
    console.error("공지사항 수정 오류:", err);
    res.status(500).json({ message: "공지사항 수정 실패" });
  }
});
