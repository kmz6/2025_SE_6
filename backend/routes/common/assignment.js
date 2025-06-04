const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/lectures/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT assignment_id, title, author_id, content, start_date, end_date 
       FROM ASSIGNMENTS_TB WHERE course_id = ? ORDER BY start_date DESC`,
      [courseId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "과제 목록 조회 실패" });
  }
});

router.get("/lectures/:courseId/assignments/:id", async (req, res) => {
  const { courseId, id } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT assignment_id, title, author_id, content, start_date, end_date 
       FROM ASSIGNMENTS_TB WHERE course_id = ? AND assignment_id = ?`,
      [courseId, id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "과제 없음" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "과제 상세 조회 실패" });
  }
});

router.post("/lectures/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;
  const { title, author_id, content, start_date, end_date } = req.body;
  try {
    await db.execute(
      `INSERT INTO ASSIGNMENTS_TB 
       (course_id, title, author_id, content, start_date, end_date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [courseId, title, author_id, content, start_date, end_date]
    );
    res.status(201).json({ message: "과제 등록 성공" });
  } catch (err) {
    res.status(500).json({ message: "과제 등록 실패" });
  }
});

router.put("/lectures/:courseId/assignments/:id", async (req, res) => {
  const { courseId, id } = req.params;
  const { title, content, start_date, end_date } = req.body;
  try {
    const [result] = await db.execute(
      `UPDATE ASSIGNMENTS_TB SET title = ?, content = ?, start_date = ?, end_date = ?
       WHERE course_id = ? AND assignment_id = ?`,
      [title, content, start_date, end_date, courseId, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "과제 없음" });
    res.json({ message: "과제 수정 성공" });
  } catch (err) {
    res.status(500).json({ message: "과제 수정 실패" });
  }
});

router.delete("/lectures/:courseId/assignments/:id", async (req, res) => {
  const { courseId, id } = req.params;
  try {
    const [result] = await db.execute(
      `DELETE FROM ASSIGNMENTS_TB WHERE course_id = ? AND assignment_id = ?`,
      [courseId, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "과제 없음" });
    res.json({ message: "과제 삭제 성공" });
  } catch (err) {
    res.status(500).json({ message: "과제 삭제 실패" });
  }
});

router.get("/assignments/:assignmentId/attachments", async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT file_id, file_name, file_path FROM ASSIGNMENTS_ATTACHMENT_TB WHERE assignment_id = ?`,
      [assignmentId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "첨부파일 조회 실패" });
  }
});

router.post("/assignments/:assignmentId/attachments", async (req, res) => {
  const { assignmentId } = req.params;
  const { file_name, file_path } = req.body;
  try {
    await db.execute(
      `INSERT INTO ASSIGNMENTS_ATTACHMENT_TB (assignment_id, file_name, file_path) VALUES (?, ?, ?)`,
      [assignmentId, file_name, file_path]
    );
    res.status(201).json({ message: "첨부파일 등록 성공" });
  } catch (err) {
    res.status(500).json({ message: "첨부파일 등록 실패" });
  }
});

router.delete("/assignments/attachments/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
    const [result] = await db.execute(
      `DELETE FROM ASSIGNMENTS_ATTACHMENT_TB WHERE file_id = ?`,
      [fileId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "첨부파일 없음" });
    res.json({ message: "첨부파일 삭제 성공" });
  } catch (err) {
    res.status(500).json({ message: "첨부파일 삭제 실패" });
  }
});

router.post("/lectures/:lectureId/assignments/:assignmentId/submissions", async (req, res) => {
  const { lectureId, assignmentId } = req.params;
  const { title, author_id, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용은 필수 항목입니다." });
  }
  try {
    await db.execute(
      `INSERT INTO SUBMISSIONS_TB (assignment_id, author_id, title, content)
       VALUES (?, ?, ?, ?)`,
      [assignmentId, author_id, title, content]
    );
    res.status(200).json({ message: "과제 제출 성공" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류로 과제 제출에 실패했습니다." });
  }
});

router.get("/lectures/:lectureId/assignments/:assignmentId/status", async (req, res) => {
  const { assignmentId } = req.params;
  const { user_id } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT COUNT(*) AS submission_count
       FROM SUBMISSIONS_TB
       WHERE assignment_id = ? AND author_id = ?`,
      [assignmentId, user_id]
    );
    const submissionCount = rows[0]?.submission_count || 0;
    res.status(200).json({ status: submissionCount > 0 ? "제출 완료" : "미제출" });
  } catch (error) {
    res.status(500).json({ message: "제출 상태 조회 실패", error: error.message });
  }
});

router.get("/lectures/:lectureId/assignments/:assignmentId/submissions", async (req, res) => {
  const { assignmentId } = req.params;
  const { author_id } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT s.submission_id, s.assignment_id, s.title, s.author_id, s.content, s.created_at,
              JSON_ARRAYAGG(
                JSON_OBJECT('name', att.file_name, 'url', att.file_path)
              ) AS attachments
       FROM SUBMISSIONS_TB s
       LEFT JOIN SUBMISSIONS_ATTACHMENT_TB att ON s.submission_id = att.submission_id
       WHERE s.assignment_id = ? AND s.author_id = ?
       GROUP BY s.submission_id`,
      [assignmentId, author_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "제출 과제 조회 실패" });
  }
});

router.delete("/lectures/:lectureId/assignments/:assignmentId/submissions", async (req, res) => {
  const { assignmentId } = req.params;
  const { author_id } = req.body;
  try {
    const [result] = await db.execute(
      `DELETE FROM SUBMISSIONS_TB 
       WHERE assignment_id = ? AND author_id = ?`,
      [assignmentId, author_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "제출된 과제가 존재하지 않습니다." });
    }
    res.status(200).json({ message: "제출된 과제가 삭제되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "제출 과제 삭제 실패" });
  }
});

router.get("/lectures/:lectureId/students", async (req, res) => {
  const { lectureId } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT s.student_id, s.name
       FROM STUDENT_TB s
       JOIN COURSE_TB c ON s.course_id = c.course_id
       WHERE c.lecture_id = ?`,
      [lectureId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "학생 목록이 없습니다." });
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "학생 목록 조회 실패", error: err.message });
  }
});

module.exports = router;
