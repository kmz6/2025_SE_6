const db = require("../../config/db");

// 시간표 조회
exports.getTimetableByStudentId = async (student_id) => {
  const sql = `
  SELECT 
      c.course_id AS lectureId,
      c.course_name AS name,
      c.course_year,
      c.course_semester,
      ct.course_day AS day,
      ct.course_period AS time
  FROM STUD_COURSE_TB sc
  JOIN COURSE_TB c ON sc.course_id = c.course_id
  JOIN COURSE_TIME_TB ct ON c.course_id = ct.course_id
  WHERE sc.student_id = ?
`;

  const [rows] = await db.query(sql, [student_id]);

  const colors = ["#8DBCC7", "#C4E1E6", "#CBDCEB", "#98ABEE", "#9EB8D9", "#A4CCD9", "#B8CFCE", "#8DD8FF"];

  // course_id 기준으로 색 매핑
  const courseColorMap = {};
  let colorIndex = 0;

  rows.forEach((r) => {
    if (!courseColorMap[r.lectureId]) {
      courseColorMap[r.lectureId] = colors[colorIndex % colors.length];
      colorIndex++;
    }
  });

  // 색
  return rows.map((r) => ({
    ...r,
    color: courseColorMap[r.lectureId],
  }));
};