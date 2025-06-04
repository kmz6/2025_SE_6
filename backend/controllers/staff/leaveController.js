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

// 휴복학 승인
async function patchLeaveApprove(req, res) {
    const { req_id, req_type } = req.params;
    let enroll_status; // 상태 변화

    if (req_type === "leave") {
        enroll_status = "on_leave";
    }
    else {
        enroll_status = "enrolled";
    }

    try {
        const result = await leaveModel.leaveApprove(req_id, enroll_status);
        return res.json({ message: "정상적으로 완료되었습니다." }); // 성공 메세지 반환

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 휴복학 반려
async function patchLeaveReject(req, res) {
    const { req_id } = req.params;

    try {
        const result = await leaveModel.leaveReject(req_id);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    getCount,
    getRequest,
    patchLeaveApprove,
    patchLeaveReject
};