const myModel = require("../models/myModel");

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await myModel.findUserById(userId);

    if (!result) {
      return res.status(404).json({ message: "사용자 정보 없음" });
    }
    res.json(result);
  } catch (error) {
    console.error("사용자 조회 오류", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { telephone, email } = req.body;

  try {
    const result = await myModel.updateUserInfo(userId, { telephone, email });
    if (!result) return res.status(404).json({ message: "사용자 없음" });
    res.json(result);
  } catch (err) {
    console.error("사용자 정보 수정 오류", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await myModel.findUserPassword(userId);
    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }
    if (currentPassword !== user.password) {
      return res
        .status(400)
        .json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }
    await myModel.updateUserPassword(userId, newPassword);
    console.log("DB에서 조회한 비밀번호:", user.password);
    console.log(user);
    return res.status(200).json({ message: "비밀번호가 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 변경 오류:", error);
    return res.status(500).json({ message: "서버 오류 발생" });
  }
};
