const gradeModel = require("../../models/student/gradeModel");

async function getSemesters(req, res) {
    const { user_id } = req.params;

    try {
        const result = await gradeModel.findSemestersById(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

async function getGrades(req, res) {
    const { user_id } = req.params;

    try {
        const result = await gradeModel.findGrades(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getSemesters,
    getGrades
};