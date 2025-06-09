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

// 과제 목록 조회
router.get("/lectures/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT assignment_id, title, author_id, content, start_date, end_date, created_at
       FROM ASSIGNMENTS_TB 
       WHERE course_id = ? 
       ORDER BY start_date DESC`,
      [courseId]
    );

    res.status(200).json({
      success: true,
      data: rows,
      message: "과제 목록 조회 성공"
    });
  } catch (err) {
    console.error("과제 목록 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "과제 목록 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 특정 과제 상세 조회
router.get("/lectures/:courseId/assignments/:id", async (req, res) => {
  const { courseId, id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT a.*, f.name
       FROM ASSIGNMENTS_TB a JOIN FACULTY_TB f ON a.author_id = f.faculty_id
       WHERE a.course_id = ? AND a.assignment_id = ?`,
      [courseId, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 과제를 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
      message: "과제 상세 조회 성공"
    });
  } catch (err) {
    console.error("과제 상세 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "과제 상세 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 등록
router.post("/lectures/:courseId/assignments", upload.array('many'), async (req, res) => {
  const { courseId } = req.params;
  const { title, author_id, content, start_date, end_date } = req.body;
  const files = req.files;

  // 필수 필드 검증
  if (!title || !author_id || !content || !start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "필수 필드가 누락되었습니다. (title, author_id, content, start_date, end_date)"
    });
  }

  // 날짜 유효성 검증
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "올바른 날짜 형식이 아닙니다."
    });
  }

  if (startDate >= endDate) {
    return res.status(400).json({
      success: false,
      message: "시작일은 종료일보다 이전이어야 합니다."
    });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // assignment_tb에 게시글 등록
    const assignSql = `INSERT INTO ASSIGNMENTS_TB
                            (course_id, title, author_id, content, start_date, end_date) 
                            VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await connection.query(assignSql,
      [courseId, title, author_id, content, start_date, end_date]);

    const assignId = await result.insertId;

    // 첨부 파일 등록
    const attachSql = `INSERT INTO ASSIGNMENTS_ATTACHMENT_TB
                            (assignment_id, file_name, file_path)
                            VALUES (?, ?, ?)`;

    for (const file of files) {
      await connection.query(attachSql, [assignId, file.filename, `uploads/${file.filename}`]);
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      data: { assignment_id: result.insertId },
      message: "과제 등록 성공"
    });
  }
  catch (error) {
    await connection.rollback();

    console.error("과제 등록 오류:", error);
    res.status(500).json({
      success: false,
      message: "과제 등록 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });

    throw error;
  }
  finally {
    connection.release();
  }
});

// 과제 수정
router.put("/lectures/:courseId/assignments/:id", upload.array('many'), async (req, res) => {
  const { courseId, id } = req.params;
  const { title, content, start_date, end_date } = req.body;
  const files = req.files;

  // 필수 필드 검증
  if (!title || !content || !start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "필수 필드가 누락되었습니다. (title, content, start_date, end_date)"
    });
  }

  // 날짜 유효성 검증
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "올바른 날짜 형식이 아닙니다."
    });
  }

  if (startDate >= endDate) {
    return res.status(400).json({
      success: false,
      message: "시작일은 종료일보다 이전이어야 합니다."
    });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // assignment_tb에 게시글 업데이트
    const assignSql = `UPDATE ASSIGNMENTS_TB
                       SET title = ?, content = ?, start_date = ?, end_date = ? 
                       WHERE assignment_id = ?`;

    const [result] = await connection.query(assignSql,
      [title, content, start_date, end_date, id]);

    if (files.length > 0) {
      // attachment_tb 기존 첨부파일 삭제
      const deleteSql = `DELETE FROM ASSIGNMENTS_ATTACHMENT_TB
                            WHERE assignment_id = ?`;

      await connection.execute(deleteSql, [id]);

      // attachment_tb 추가
      const attachSql = `INSERT INTO ASSIGNMENTS_ATTACHMENT_TB
                                (assignment_id, file_name, file_path)
                                VALUES (?, ?, ?)`;

      for (const file of files) {
        await connection.query(attachSql, [id, file.filename, `uploads/${file.filename}`]);
      }
    }

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "과제 수정 성공"
    });
  }
  catch (error) {
    await connection.rollback();

    console.error("과제 수정 오류:", error);
    res.status(500).json({
      success: false,
      message: "과제 수정 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });

    throw error;
  }
  finally {
    connection.release();
  }
});

// 과제 삭제
router.delete("/lectures/:courseId/assignments/:id", async (req, res) => {
  const { courseId, id } = req.params;

  try {
    // 과제 삭제
    const [result] = await db.execute(
      `DELETE FROM ASSIGNMENTS_TB WHERE course_id = ? AND assignment_id = ?`,
      [courseId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 과제를 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      message: "과제 삭제 성공"
    });
  }
  catch (err) {
    console.error("과제 삭제 오류:", err);
    res.status(500).json({
      success: false,
      message: "과제 삭제 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 첨부파일 조회
router.get("/assignments/:assignmentId/attachments", async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT file_id, file_name, file_path, uploaded_at
       FROM ASSIGNMENTS_ATTACHMENT_TB 
       WHERE assignment_id = ?
       ORDER BY uploaded_at DESC`,
      [assignmentId]
    );

    res.status(200).json({
      success: true,
      data: rows,
      message: "첨부파일 목록 조회 성공"
    });
  } catch (err) {
    console.error("첨부파일 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "첨부파일 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 첨부파일 등록
router.post("/assignments/:assignmentId/attachments", async (req, res) => {
  const { assignmentId } = req.params;
  const { file_name, file_path } = req.body;

  if (!file_name || !file_path) {
    return res.status(400).json({
      success: false,
      message: "파일명과 파일 경로는 필수입니다."
    });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO ASSIGNMENTS_ATTACHMENT_TB (assignment_id, file_name, file_path, uploaded_at) 
       VALUES (?, ?, ?, NOW())`,
      [assignmentId, file_name, file_path]
    );

    res.status(201).json({
      success: true,
      data: { file_id: result.insertId },
      message: "첨부파일 등록 성공"
    });
  } catch (err) {
    console.error("첨부파일 등록 오류:", err);
    res.status(500).json({
      success: false,
      message: "첨부파일 등록 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 첨부파일 삭제
router.delete("/assignments/attachments/:fileId", async (req, res) => {
  const { fileId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM ASSIGNMENTS_ATTACHMENT_TB WHERE file_id = ?`,
      [fileId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 첨부파일을 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      message: "첨부파일 삭제 성공"
    });
  } catch (err) {
    console.error("첨부파일 삭제 오류:", err);
    res.status(500).json({
      success: false,
      message: "첨부파일 삭제 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 제출
router.post("/lectures/:lectureId/assignments/:assignmentId/submissions", upload.array('many'), async (req, res) => {
  const { lectureId, assignmentId } = req.params;
  const { title, author_id, content } = req.body;
  const files = req.files;

  console.log("파일 : ", req.files);

  if (!title || !content || !author_id) {
    return res.status(400).json({
      success: false,
      message: "제목, 내용은 필수 항목입니다."
    });
  }

  const connection = await db.getConnection();
  try {
    // 과제 마감일 확인
    const [assignmentRows] = await db.execute(
      `SELECT end_date FROM ASSIGNMENTS_TB WHERE assignment_id = ? AND course_id = ?`,
      [assignmentId, lectureId]
    );

    if (assignmentRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 과제를 찾을 수 없습니다."
      });
    }

    const endDate = new Date(assignmentRows[0].end_date);
    const now = new Date();

    if (now > endDate) {
      return res.status(400).json({
        success: false,
        message: "과제 제출 기한이 지났습니다."
      });
    }

    // 중복 제출 확인
    const [existingSubmission] = await db.execute(
      `SELECT submission_id FROM SUBMISSIONS_TB WHERE assignment_id = ? AND author_id = ?`,
      [assignmentId, author_id]
    );

    if (existingSubmission.length > 0) {
      return res.status(400).json({
        success: false,
        message: "이미 제출한 과제입니다. 수정을 원하시면 기존 제출물을 삭제 후 다시 제출해주세요."
      });
    }

    await connection.beginTransaction();

    // submission_tb에 게시글 등록
    const subSql = `INSERT INTO SUBMISSIONS_TB
                            (assignment_id, author_id,title, content) 
                            VALUES (?, ?, ?, ?)`;

    const [result] = await connection.query(subSql,
      [assignmentId, author_id, title, content]);

    const subId = await result.insertId;

    // 첨부 파일 등록
    const attachSql = `INSERT INTO SUBMISSIONS_ATTACHMENT_TB
                            (submission_id, file_name, file_path)
                            VALUES (?, ?, ?)`;

    for (const file of files) {
      await connection.query(attachSql, [subId, file.filename, `uploads/${file.filename}`]);
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      data: { submission_id: result.insertId },
      message: "과제 등록 성공"
    });
  }
  catch (error) {
    await connection.rollback();

    console.error("과제 등록 오류:", error);
    res.status(500).json({
      success: false,
      message: "과제 등록 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });

    throw error;
  }
  finally {
    connection.release();
  }
});

// 과제(제출) 첨부파일 조회
router.get("/submissions/attachments/:submissionId/", async (req, res) => {
  const { submissionId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT file_id, file_name, file_path, uploaded_at
       FROM SUBMISSIONS_ATTACHMENT_TB
       WHERE submission_id = ?
       ORDER BY uploaded_at DESC`,
      [submissionId]
    );

    res.status(200).json({
      success: true,
      data: rows,
      message: "첨부파일 목록 조회 성공"
    });
  } catch (err) {
    console.error("첨부파일 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "첨부파일 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 제출 목록 조회
router.get("/lectures/:lectureId/assignments/:assignmentId/submissions", async (req, res) => {
  const { lectureId, assignmentId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT s.submission_id, s.assignment_id, s.title, s.author_id, s.content, s.created_at,
              st.name AS student_name
       FROM SUBMISSIONS_TB s
       LEFT JOIN STUDENT_TB st ON s.author_id = st.student_id
       INNER JOIN ASSIGNMENTS_TB a ON s.assignment_id = a.assignment_id
       WHERE s.assignment_id = ? AND a.course_id = ?
       ORDER BY s.created_at DESC`,
      [assignmentId, lectureId]
    );

    const submittedAssignments = rows.map((submission) => ({
      ...submission,
      status: "제출 완료",
    }));

    res.status(200).json({
      success: true,
      data: submittedAssignments,
      message: "제출 목록 조회 성공"
    });
  } catch (err) {
    console.error("제출 목록 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "제출 상태 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 과제 제출 취소 (삭제)
router.delete("/lectures/:lectureId/assignments/:assignmentId/submissions", async (req, res) => {
  const { assignmentId } = req.params;
  const { author_id } = req.body;

  if (!author_id) {
    return res.status(400).json({
      success: false,
      message: "작성자 ID가 필요합니다."
    });
  }

  try {
    const [result] = await db.execute(
      `DELETE FROM SUBMISSIONS_TB 
       WHERE assignment_id = ? AND author_id = ?`,
      [assignmentId, author_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "제출된 과제가 존재하지 않습니다."
      });
    }

    res.status(200).json({
      success: true,
      message: "제출된 과제가 삭제되었습니다."
    });
  } catch (err) {
    console.error("제출 과제 삭제 오류:", err);
    res.status(500).json({
      success: false,
      message: "제출 과제 삭제 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 강의 수강 학생 목록 조회
router.get("/lectures/:lectureId/students", async (req, res) => {
  const { lectureId } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT s.student_id, s.name, s.email
       FROM STUDENT_TB s
       INNER JOIN STUD_COURSE_TB sc ON s.student_id = sc.student_id
       INNER JOIN COURSE_TB c ON sc.course_id = c.course_id
       WHERE c.course_id = ?
       ORDER BY s.name`,
      [lectureId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "해당 강의에 등록된 학생이 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      data: rows,
      message: "학생 목록 조회 성공"
    });
  } catch (err) {
    console.error("학생 목록 조회 오류:", err);
    res.status(500).json({
      success: false,
      message: "학생 목록 조회 실패",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

router.put(
  '/lectures/:lectureId/assignments/:assignmentId/submissions/:submissionId', upload.array('many'),
  async (req, res) => {
    const { assignmentId, submissionId } = req.params;
    const { title, author_id, content } = req.body;
    const file = req.files;

    if (!title || !author_id || !content) {
      return res.status(400).json({
        success: false,
        message: "필수 데이터(title, content, author_id)가 누락되었습니다."
      });
    }

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // submission_tb에 게시글 업데이트
      const subSql = `UPDATE SUBMISSIONS_TB
                       SET title = ?, content = ?
                       WHERE submission_id = ?`;

      const [result] = await connection.query(subSql,
        [title, content, submissionId]);

      if (files.length > 0) {
        // attachment_tb 기존 첨부파일 삭제
        const deleteSql = `DELETE FROM SUBMISSIONS_ATTACHMENT_TB
                            WHERE submission_id = ?`;

        await connection.execute(deleteSql, [submissionId]);

        // attachment_tb 추가
        const attachSql = `INSERT INTO SUBMISSIONS_ATTACHMENT_TB
                                (submission_id, file_name, file_path)
                                VALUES (?, ?, ?)`;

        for (const file of files) {
          await connection.query(attachSql, [submissionId, file.filename, `uploads/${file.filename}`]);
        }
      }

      await connection.commit();

      res.status(200).json({
        success: true,
        message: "과제 수정 성공"
      });
    }
    catch (error) {
      await connection.rollback();

      console.error("과제 수정 오류:", error);
      res.status(500).json({
        success: false,
        message: "과제 수정 실패",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });

      throw error;
    }
    finally {
      connection.release();
    }
  }
);


module.exports = router;