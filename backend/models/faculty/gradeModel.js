const db = require("../../config/db");

// 교수 강의 정보
async function findCoursesById(user_id) {
    // 강의 정보
    const courseSql = `SELECT *
                    FROM COURSE_TB
                    WHERE faculty_id = ? AND course_year = 2025 AND course_semester = 1
                    ORDER BY course_name DESC;`;

    // 성적 입력 여부
    const statusSql = `SELECT c.course_id, COUNT(*) AS count
                        FROM COURSE_TB c JOIN STUD_COURSE_TB sc ON c.course_id = sc.course_id
                        WHERE c.faculty_id = ? AND c.course_year = 2025 AND c.course_semester = 1 
                        AND sc.grade = 'N/A'
                        GROUP BY c.course_id`;

    // 시간 정보
    const timeSql = `SELECT t.*
                    FROM COURSE_TB c JOIN COURSE_TIME_TB t ON c.course_id = t.course_id
                    WHERE faculty_id = ? AND course_year = 2025 AND course_semester = 1`

    const [courses] = await db.query(courseSql, [user_id]);
    const [status] = await db.query(statusSql, [user_id]);
    const [times] = await db.query(timeSql, [user_id]);

    const courseMap = courses.map(course => {
        const courseTimes = times.filter(t => t.course_id === course.course_id); // 해당 수업 시간대
        const courseStatus = status.find(s => s.course_id === course.course_id); // 성적 입력 상태
        const isComplete = !courseStatus;

        return {
            ...course,
            status: isComplete ? "완료" : "미입력",
            times: courseTimes
        };
    });

    return courseMap;
}

// 강의 정보
async function findCourseInfoById(course_id) {
    const sql = `SELECT *
                    FROM COURSE_TB
                    WHERE course_id = ?`;

    const [results] = await db.query(sql, [course_id]);

    return results[0];
}

// 학생 정보
async function findStudentInfoById(course_id) {
    const sql = `SELECT s.department, s.name, sc.*
                    FROM STUD_COURSE_TB sc JOIN STUDENT_TB s ON sc.student_id = s.student_id
                    WHERE sc.course_id = ?
                    ORDER BY sc.student_id;`;

    const [results] = await db.query(sql, [course_id]);

    return results;
}

// 학생 점수 정보
async function updateStudent(data) {
    const sql = `UPDATE STUD_COURSE_TB
                    SET attendance = ?, midterm_exam = ?, final_exam = ?, assignment = ?, etc = ?, grade = ?
                    WHERE course_id = ? AND student_id = ?`;

    await db.query(sql, data)
}

module.exports = {
    findCoursesById,
    findCourseInfoById,
    findStudentInfoById,
    updateStudent
};