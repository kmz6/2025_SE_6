const gradeModel = require("../../models/faculty/gradeModel");

async function getCourseList(req, res) {
    const { user_id } = req.params;

    try {
        const result = await gradeModel.findCoursesById(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

async function getCourseInfo(req, res) {
    const { course_id } = req.params;

    try {
        const result = await gradeModel.findCourseInfoById(course_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

async function getStudentInfo(req, res) {
    const { course_id } = req.params;

    try {
        const result = await gradeModel.findStudentInfoById(course_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getCourseList,
    getCourseInfo,
    getStudentInfo,
};