import axiosInstance from "../axiosInstance";

//학생의 석차 정보 요청
export const getRank = async (user_id) => {
    const response = await axiosInstance.get(`/rank/${user_id}`);
    return response.data;
};