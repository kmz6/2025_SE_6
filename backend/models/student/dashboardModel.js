const db = require("../../config/db");

async function getSubmissionsByStudent(userId) {
  const query = `
    SELECT
      a.assignment_id,
      a.course_id,
      c.course_name,
      a.title AS assignment_title,
      a.start_date,
      a.end_date,
      s.submission_id
    FROM ASSIGNMENTS_TB a
    JOIN COURSE_TB c ON a.course_id = c.course_id
    JOIN STUD_COURSE_TB sc ON a.course_id = sc.course_id
    LEFT JOIN SUBMISSIONS_TB s ON a.assignment_id = s.assignment_id AND s.author_id = sc.student_id
    WHERE sc.student_id = ?
    ORDER BY a.start_date ASC;
  `;
  const [rows] = await db.execute(query, [userId]);
  return rows;
}

module.exports = { getSubmissionsByStudent };
