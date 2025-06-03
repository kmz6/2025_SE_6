import axiosInstance from "../axiosInstance";

// 학생의 휴복학 정보
export const getStudLeaveInfo = async (user_id) => {
    const response = await axiosInstance.get(`/leave/student/info/${user_id}`);
    return response.data;
};

// 휴복학 신청
export const postLeaveRequest = async (user_id, request_type) => {

    // 잘못된 요청인 경우
    if (!['on_leave', 'return'].includes(request_type)) {
        throw new Error('잘못된 request_type입니다.');
    }

    const response = await axiosInstance.post(`/leave/student/${user_id}/${request_type}`)
    return response.data;
}