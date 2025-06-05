const gradeModel = require("../../models/student/gradeModel");
const gradePoints = require("../../constants/gradePoints");

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

async function getCredits(req, res) {
    const { user_id } = req.params;

    try {
        const result = await gradeModel.countCredits(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

async function getGpas(req, res) {
    const { user_id } = req.params;

    try {
        const semesters = await gradeModel.findSemestersById(user_id); //학기별 정보
        const courses = await gradeModel.findGrades(user_id);

        let totalWeightedSum = 0;
        let totalCredits = 0;

        const filteredCourse = await Promise.all(semesters.map(async ({ course_year, course_semester }) => {
            const semester = `${course_year}-${course_semester}`;
            let semWeightedSum = 0;
            let semCredits = 0;

            const semCourses = courses.filter((course) => {
                const courseSemester = `${course.course_year}-${course.course_semester}`; // 과목의 학기
                return courseSemester === semester; // 같은 학기 과목만 반환
            })

            semCourses.map((c) => {
                if (c.grade != "N/A") {
                    semWeightedSum += c.credit * gradePoints[c.grade];
                    semCredits += c.credit;
                }
            })

            const semGpa = semCredits > 0 ? (semWeightedSum / semCredits) : 0;

            totalWeightedSum += semWeightedSum;
            totalCredits += semCredits;

            return {
                semester,
                gpa: semGpa.toFixed(2)
            };
        }));

        const allGpa = totalCredits > 0 ? (totalWeightedSum / totalCredits) : 0;

        const result = {
            courses: filteredCourse,
            overallGpa: allGpa.toFixed(2)
        };

        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getSemesters,
    getGrades,
    getCredits,
    getGpas
};