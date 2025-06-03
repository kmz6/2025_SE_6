import axiosInstance from "../axiosInstance";

// 휴복학 대기 정보
export const getLeaveAll = async () => {
    const response = await axiosInstance.get(`/leave/staff/info/`);
    return response.data;
};