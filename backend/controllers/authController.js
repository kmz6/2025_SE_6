const authModel = require("../models/authModel");

async function userLogin(req, res) {
    const { user_id, password } = req.body; //입력 받은 아이디, 비밀번호

    console.log(user_id, password);

    try {
        const user = await authModel.findUser(user_id, password); //DB에서 조회

        console.log("유저 검색 결과 : ", user);

        if (!user) {
            return res.status(401).json({ message: "아이디  비밀번호가 올바르지 않습니다." });
        }

        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    userLogin,
};