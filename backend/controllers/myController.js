const myModel = require("../models/myModel");

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await myModel.findUserById(userId);

    if (!result) {
      return res
        .status(404)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
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
