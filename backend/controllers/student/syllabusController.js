const CourseModel = require("../../models/student/courseModel");

// 모든 강의 목록 조회
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error("강의 목록 조회 실패:", err);
    res.status(500).json({ message: "서버 에러 발생" });
  }
};

// 강의 상세 정보 조회
exports.getCourseByCode = async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const course = await CourseModel.getCourseByCode(courseCode);
    res.json(course);
  } catch (error) {
    console.error("강의 상세 조회 실패:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};