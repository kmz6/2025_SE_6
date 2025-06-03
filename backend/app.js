require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const signupRouter = require("./routes/signup");
const myRouter = require("./routes/my");
const memberRouter = require("./routes/staff/member");
const resetpwdRouter = require("./routes/resetpwd");
const studentRouter = require("./routes/student");
const courseRouter = require("./routes/common/course");
const sugangRouter = require("./routes/student/sugang");

const noticeRouter = require("./routes/common/notice");
const materialRouter = require("./routes/common/material");
const qnaRouter = require("./routes/common/qna");

const timetableRouter = require("./routes/student/timetable");
const studsyllabusRouter = require("./routes/student/syllabus");
const profsyllabusRouter = require("./routes/faculty/syllabus");

const studInfoRouter = require("./routes/student/studentInfo");
const gradeRouter = require("./routes/student/grade");
const rankRouter = require("./routes/student/rank");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", indexRouter);
app.use("/users", authRouter);
app.use("/users/signup", signupRouter);
app.use("/my", myRouter);
app.use("/staff", memberRouter);
app.use("/users/resetpwd", resetpwdRouter);
app.use("/api/student", studentRouter);
app.use("/api/courses", courseRouter);

app.use("/api", noticeRouter);
app.use("/api", materialRouter);
app.use("/api", qnaRouter);

app.use("/sugang", sugangRouter);
app.use("/timetable", timetableRouter);
app.use("/api/syllabus", studsyllabusRouter);
app.use("/api/syllabus/prof", profsyllabusRouter);

app.use("/studInfo", studInfoRouter);
app.use("/grade", gradeRouter);
app.use("/rank", rankRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
