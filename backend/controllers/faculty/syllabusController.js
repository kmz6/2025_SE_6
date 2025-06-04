const CourseModel = require("../../models/faculty/courseModel");

// 교수 담당 강의 조회
exports.getCoursesByFaculty = async (req, res) => {
  const { facultyId } = req.query;
  const courses = await CourseModel.getCoursesByFaculty(facultyId);
  res.json(courses);
};

// 강의 정보 조회
exports.getCourseDetail = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const course = await CourseModel.getCourseByCode(courseCode);
    res.json(course);
  } catch (err) {
    console.error("강의 상세 조회 실패", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 강의 정보 업데이트
exports.updateCourse = async (req, res) => {
  const { courseCode } = req.params;
  const newData = req.body;
  await CourseModel.updateCourse(courseCode, newData);
  res.sendStatus(200);
};