const CourseModel = require("../../models/faculty/lecturelistModel");

exports.getLectureListByProfessor = async (req, res) => {
  const facultyId = req.params.professorId;
  try {
    const result = await CourseModel.getCoursesByFaculty(facultyId);
    res.status(200).json(result);  // <- 여기
  } catch (error) {
    console.error("강의 목록 조회 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};