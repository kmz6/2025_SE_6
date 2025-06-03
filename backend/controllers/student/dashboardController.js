const submissionModel = require("../../models/student/dashboardModel");

async function getStudentSubmissions(req, res) {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ error: "에러" });
    }
    const submissions = await submissionModel.getSubmissionsByStudent(userId);
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
  }
}

module.exports = { getStudentSubmissions };
