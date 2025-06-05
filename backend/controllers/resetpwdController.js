const resetPwdModel = require("../models/resetpwdModel");

// 비밀번호 초기화
async function resetPassword(req, res) {
  const { user_id, name, email } = req.body;

  try {
    const userType = await resetPwdModel.findUserType(user_id);
    if (!userType) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    const matched = await resetPwdModel.verifyUser(userType, user_id, name, email);
    if (!matched) return res.status(401).json({ message: "정보가 일치하지 않습니다." });

    await resetPwdModel.updatePassword(user_id, "0000");
    res.json({ message: "비밀번호가 '0000'으로 초기화되었습니다." });

  } catch (err) {
    console.error("[비밀번호 초기화 오류]", err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
}

module.exports = {
  resetPassword,
};