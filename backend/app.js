require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
<<<<<<< HEAD
const myRouter = require("./routes/my");
=======
const signupRouter = require("./routes/signup");
>>>>>>> main

const studentRouter = require("./routes/student");
const courseRouter = require("./routes/common/course");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", indexRouter);
app.use("/users", authRouter);

app.use("/api/student", studentRouter);
app.use("/api/courses", courseRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
