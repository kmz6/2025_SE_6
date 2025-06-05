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

// 학점 수 요청
export const getCredits = async (user_id) => {
    const response = await axiosInstance.get(`/grade/credit/${user_id}`);
    return response.data;
}

// 평량 평균 요청
export const getGpas = async (user_id) => {
    const response = await axiosInstance.get(`/grade/gpa/${user_id}`);
    return response.data;
}

// 학점별 개수 요청
export const getGradeCount = async (user_id) => {
    const response = await axiosInstance.get(`/grade/count/${user_id}`);
    return response.data;
}