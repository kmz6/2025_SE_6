const leaveModel = require("../../models/student/leaveModel");

// 휴복학 정보 가져오기
async function getLeaves(req, res) {
    const { user_id } = req.params;

    try {
        const result = await leaveModel.findLeaveById(user_id);

        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 휴복학 신청하기
async function requestLeaves(req, res) {
    const { user_id, request_type } = req.params;
    let reqType;

    if (request_type === "on_leave") {
        reqType = "leave";
    }
    else {
        reqType = "return";
    }

    try {
        const result = await leaveModel.insertRequest(user_id, reqType);
        return res.json({ message: "정상적으로 신청되었습니다." }); // 성공 메세지 반환

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 휴복학 신청 취소
async function requestCancel(req, res) {
    const { req_id } = req.params;

    try {
        const result = await leaveModel.deleteRequest(req_id);
        return res.json({ message: "정상적으로 취소되었습니다." }); // 성공 메세지 반환

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getLeaves,
    requestLeaves,
    requestCancel
};