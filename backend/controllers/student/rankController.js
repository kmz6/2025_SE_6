const gradeModel = require("../../models/student/gradeModel");
const rankModel = require("../../models/student/rankModel");
const gradePoints = require("../../constants/gradePoints");

async function getSemData(req, res) {
    const { user_id } = req.params;

    // 해당 학기의 학점 수, 평점, 석차를 반환
    function getSemGradeRank(user_id, allGrades) {
        const studentGradesMap = new Map(); // 학번별 학생 매핑

        const hasNA = allGrades.some(course => course.grade === "N/A"); // grade가 없는 학기 확인

        allGrades.forEach(course => {
            const studentId = course.student_id;
            const credit = course.credit; // 학점 수
            const grade = course.grade; // 학점

            if (!studentGradesMap.has(studentId)) { //학생 아이디 없는 경우
                studentGradesMap.set(studentId, { totalCredits: 0, totalGradePoints: 0, gpa: 0 });
            }

            const studentData = studentGradesMap.get(studentId);

            studentData.totalCredits += credit;

            //성적이 나온 과목들만 처리
            if (grade !== "N/A") {
                studentData.totalGradePoints += (gradePoints[grade] ?? 0) * credit;
            }
        });

        // 평균 평점 계산
        for (const [studentId, data] of studentGradesMap) {
            data.gpa = data.totalCredits > 0 ? data.totalGradePoints / data.totalCredits : 0;
        }

        const semData = studentGradesMap.get(user_id) || { totalCredits: 0, gpa: 0 }; // 학점 정보

        // 학점 정보가 없는 학기가 있다면
        if (hasNA) {
            return {
                totalCredits: semData.totalCredits,
                gpa: semData.gpa.toFixed(2),
                rank: "-"
            };
        }

        const sortedStudents = [...studentGradesMap.entries()].sort((a, b) => {
            // 평점 높은 사람 순
            if (b[1].gpa !== a[1].gpa) {
                return b[1].gpa - a[1].gpa;
            }
            // 평점 같으면, 전체 학점 수 많은 사람 순
            return b[1].totalCredits - a[1].totalCredits;
        });

        const rank = sortedStudents.findIndex(([studentId]) => studentId === user_id) + 1; //석차 정보

        return {
            totalCredits: semData.totalCredits, gpa: semData.gpa, rank
        };
    }

    try {

        const semesters = await gradeModel.findSemestersById(user_id); // 학기 리스트

        const filteredCourse = await Promise.all(semesters.map(async ({ course_year, course_semester }) => {
            const semester = `${course_year}-${course_semester}`;

            const { department } = await rankModel.findMajorById(user_id); // 학과 정보
            const allGrades = await rankModel.findGradesBySemester(department, course_year, course_semester); //같은과, 같은 학기 학생들의 성적

            let { totalCredits, gpa, rank } = await getSemGradeRank(user_id, allGrades);

            return {
                semester,
                totalCredits,
                gpa,
                rank
            };
        }));

        return res.json(filteredCourse);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getSemData
};