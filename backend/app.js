require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/index");

// 로그인 / 회원 가입 / 비밀번호 변경 / 마이 페이지
const authRouter = require("./routes/auth");
const signupRouter = require("./routes/signup");
const resetpwdRouter = require("./routes/resetpwd");
const myRouter = require("./routes/my");

// 구성원 관리
const memberRouter = require("./routes/staff/member");

// 학생, 교수, 강의 정보
const studentRouter = require("./routes/student");
const facultyLectureRouter = require("./routes/faculty/course");
const courseRouter = require("./routes/common/course");

// 수강 신청
const sugangRouter = require("./routes/student/sugang");

// 공지 사항 / 첨부 파일 / QnA / 과제
const noticeRouter = require("./routes/common/notice");
const materialRouter = require("./routes/common/material");
const qnaRouter = require("./routes/common/qna");
const assignmentRouter = require("./routes/common/assignment");

// 시간표 / 강의 계획서
const timetableRouter = require("./routes/student/timetable");
const studsyllabusRouter = require("./routes/student/syllabus");
const profsyllabusRouter = require("./routes/faculty/syllabus");

// 성적 조회 / 관리
const studInfoRouter = require("./routes/student/studentInfo");
const gradeRouter = require("./routes/student/grade");
const rankRouter = require("./routes/student/rank");
const profGradeRouter = require("./routes/faculty/profGrade");

// 대시보드
const dashboardRouter = require("./routes/student/dashboard");

// 학적 관리
const studLeaveRouter = require("./routes/student/leave");
const staffLeaveRouter = require("./routes/staff/leave");

// 출석
const proflecturelist = require("./routes/faculty/lecturelist");
const profattendance = require("./routes/faculty/attendance");
const studlecturelist = require("./routes/student/lecturelist");
const studattendance = require("./routes/student/attendance");
const studcourseRouter = require("./routes/student/course"); // course_id -> course_code 변환용

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/", indexRouter);

// 로그인 / 회원 가입 / 비밀번호 변경 / 마이 페이지
app.use("/users", authRouter);
app.use("/users/signup", signupRouter);
app.use("/my", myRouter);
app.use("/users/resetpwd", resetpwdRouter);

// 구성원 관리
app.use("/staff", memberRouter);

// 학생 / 교수 / 강의 정보
app.use("/api/student", studentRouter);
app.use("/api/courses", courseRouter);
app.use("/api/faculty", facultyLectureRouter);

// 공지 사항 / 첨부 파일 / QnA / 과제
app.use("/api", noticeRouter);
app.use("/api", materialRouter);
app.use("/api", qnaRouter);
app.use("/api", assignmentRouter);

// 수강 신청
app.use("/sugang", sugangRouter);

// 시간표 / 강의 계획서
app.use("/timetable", timetableRouter);
app.use("/api/syllabus", studsyllabusRouter);
app.use("/api/syllabus/prof", profsyllabusRouter);
app.use("/api/faculty/syllabus", profsyllabusRouter);

// 성적 조회 / 관리
app.use("/studInfo", studInfoRouter);
app.use("/grade", gradeRouter);
app.use("/rank", rankRouter);
app.use("/prof/grade", profGradeRouter);

// 대시 보드
app.use("/dashboard", dashboardRouter);

// 학적 관리
app.use("/leave/student", studLeaveRouter);
app.use("/leave/staff", staffLeaveRouter);

// 출석
app.use("/api/faculty/lecturelist", proflecturelist);
app.use("/api/faculty/attendance", profattendance);
app.use("/api/student/lecturelist", studlecturelist);
app.use("/api/student/attendance", studattendance);
app.use("/api/course", studcourseRouter); // course_id -> course_code 변환용

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
