import axiosInstance from "../axiosInstance";

//교수가 강의 중인 수업 정보 요청
export const getProfCourse = async (user_id) => {
    const response = await axiosInstance.get(`/prof/grade/${user_id}/list`);
    return response.data;
};