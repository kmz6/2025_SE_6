const SugangModel = require("../../models/student/sugangModel");

const SugangController = {
  // 과목 검색 시 조회
  searchCoursesByName: async (req, res) => {
    try {
      const { courseName, user_id } = req.query;
      if (!user_id) return res.status(400).json({ error: "학생 ID 필요" });

      const results = await SugangModel.searchCoursesByName(
        courseName,
        user_id
      );
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "에러" });
    }
  },

  // 신청한 과목 목록 조회
  getRegisteredCourses: async (req, res) => {
    try {
      const { user_id } = req.query;
      if (!user_id) return res.status(400).json({ error: "학생 ID 필요" });

      const courses = await SugangModel.getRegisteredCourses(user_id);
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "에러" });
    }
  },

  // 수강신청
  registerCourse: async (req, res) => {
    try {
      const { user_id, course_id } = req.body;
      if (!user_id) return res.status(400).json({ error: "학생 ID 필요" });
      if (!course_id) return res.status(400).json({ error: "과목 ID 필요" });

      await SugangModel.registerCourse(user_id, course_id);
      res.json({ message: "수강신청 완료" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "에러" });
    }
  },

  // 수강삭제
  deleteCourse: async (req, res) => {
    try {
      const { user_id, course_id } = req.body;
      if (!user_id) return res.status(400).json({ error: "학생 ID 필요" });
      if (!course_id) return res.status(400).json({ error: "과목 ID 필요" });

      await SugangModel.deleteCourse(user_id, course_id);
      res.json({ message: "수강삭제 완료" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "에러" });
    }
  },
};

module.exports = SugangController;
