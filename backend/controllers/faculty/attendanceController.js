const profAttendanceModel = require("../../models/faculty/attendanceModel");

// 학생 출석 정보
exports.getStudentsWithAttendance = async (req, res) => {
  const { courseId } = req.params;
  const { week, session } = req.query;

  try {
    const students = await profAttendanceModel.getStudentsWithAttendance(courseId, week, session);
    res.json(students);
  } catch (err) {
    console.error("출석 목록 불러오기 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 출석 정보 저장
exports.saveAttendance = async (req, res) => {
  const { courseId } = req.params;
  const { week, session, records } = req.body;

  try {
    const result = await profAttendanceModel.saveAttendance(courseId, week, session, records);
    res.status(200).json(result);
  } catch (err) {
    console.error("출석 저장 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
};