import axiosInstance from "../axiosInstance";

//학생이 수강했던 학기 정보 요청
export const getSemester = async (user_id) => {
    const response = await axiosInstance.get(`/grade/semester/${user_id}`);
    return response.data;
};

//학생의 수강 강의 정보 요청
export const getCourse = async (user_id) => {
    const response = await axiosInstance.get(`/grade/${user_id}`);
    return response.data;
}