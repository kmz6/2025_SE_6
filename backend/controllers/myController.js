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
