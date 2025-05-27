const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
app.use("/users", authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
