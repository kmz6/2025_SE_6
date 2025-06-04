const gradeModel = require("../../models/faculty/gradeModel");

async function getCourses(req, res) {
    const { user_id } = req.params;

    try {
        const result = await gradeModel.findCoursesById(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getCourses
};