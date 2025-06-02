const timetableModel = require("../models/student/timetableModel");

async function getTimetable(req, res) {
  const { student_id } = req.params;

  try {
    const timetable = await timetableModel.getTimetableByStudentId(student_id);
    res.json(timetable);
  } catch (err) {
    console.error("[시간표 오류]", err);
    res.status(500).json({ message: "시간표를 불러오는 중 오류 발생" });
  }
}

module.exports = {
  getTimetable,
};