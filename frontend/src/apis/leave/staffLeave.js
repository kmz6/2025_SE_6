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