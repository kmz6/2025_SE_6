import axiosInstance from "../axiosInstance";

// 휴복학 요청 건수
export const getLeaveCount = async () => {
    const response = await axiosInstance.get(`/leave/staff/count`);
    return response.data;
}

// 휴복학 요청 정보
export const getLeaveAll = async () => {
    const response = await axiosInstance.get(`/leave/staff/info/`);
    return response.data;
};

// 승인
export const patchLeaveApprove = async (req_id, req_type) => {
    const response = await axiosInstance.patch(`/leave/staff/approve/${req_id}/${req_type}`);
    return response.data;
}

// 반려
export const patchLeaveReject = async (req_id) => {
    const response = await axiosInstance.patch(`/leave/staff/reject/${req_id}`);
    return response.data;
}