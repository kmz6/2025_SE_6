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

async function updateScores(req, res) {
    const student = req.body.student;

    if (!student || !student.student_id) {
        return res.status(400).json({ message: "학생 정보가 필요합니다." });
    }

    try {
        const data = [student.attendance, student.midterm_exam, student.final_exam,
        student.assignment, student.etc, student.grade, student.course_id, student.student_id];

        await gradeModel.updateStudent(data);

        return res.json({ message: "업데이트 성공" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getCourseList,
    getCourseInfo,
    getStudentInfo,
    updateScores
};