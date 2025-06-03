const studInfoModel = require("../../models/student/studInfoModel");

async function findStudent(req, res) {
    const { user_id } = req.params;

    try {
        const result = await studInfoModel.getInfo(user_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    findStudent,
};