const leaveModel = require("../../models/staff/leaveModel");

// 휴복학 요청 건수 가져오기
async function getCount(req, res) {
    try {
        const result = await leaveModel.leaveCount();
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 휴복학 요청 정보 가져오기
async function getRequest(req, res) {
    try {
        const result = await leaveModel.findLeaveAll();
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getCount,
    getRequest
};