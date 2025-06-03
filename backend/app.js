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

const noticeRouter = require("./routes/common/notice");
const materialRouter = require("./routes/common/material");

const timetableRouter = require("./routes/student/timetable");
const studsyllabusRouter = require("./routes/student/syllabus");
const profsyllabusRouter = require("./routes/faculty/syllabus");

const studInfoRouter = require("./routes/student/studentInfo");
const gradeRouter = require("./routes/student/grade");

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

app.use("/timetable", timetableRouter);
app.use("/api/syllabus", studsyllabusRouter);
app.use("/api/syllabus/prof", profsyllabusRouter);

app.use("/studInfo", studInfoRouter);
app.use("/grade", gradeRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
