const express = require("express");
const router = express.Router();

// DB로 바꿔야함!!
const mockUser = {
  user_id: "2020202020",
  password: "0000",
  user_type: "student",
  name: "고구마",
};

// POST /users/login
router.post("/login", (req, res) => {
  const { user_id, password } = req.body;

  if (user_id === mockUser.user_id && password === mockUser.password) {
    return res.json(mockUser);
  }

  return res
    .status(401)
    .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
});

module.exports = router;
