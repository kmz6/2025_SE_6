const CourseModel = require("../../models/student/lecturelistModel");

// 학생 수강 강의 목록 조회
exports.getLectureListByStudent = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await CourseModel.getCoursesByStudent(studentId);
    res.status(200).json(result);
  } catch (error) {
    console.error("학생 강의 목록 조회 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};