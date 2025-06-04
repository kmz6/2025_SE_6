const attendanceModel = require("../../models/student/attendanceModel");

exports.getStudentAttendanceMeta = async (req, res) => {
  const lectureId = req.params.lectureId;
  try {
    const meta = await attendanceModel.getAttendanceMeta(lectureId);
    res.status(200).json(meta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "출석 메타정보 조회 실패" });
  }
};

exports.getStudentAttendanceStatus = async (req, res) => {
  const lectureId = req.params.lectureId;
  const studentId = req.query.studentId;
  try {
    const statusList = await attendanceModel.getAttendanceStatus(lectureId, studentId);
    res.status(200).json(statusList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "출석 상태 조회 실패" });
  }
};