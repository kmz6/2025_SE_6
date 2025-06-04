import axiosInstance from "../axiosInstance";

// 교수가 강의 중인 리스트 요청
export const getProfCourse = async (user_id) => {
    const response = await axiosInstance.get(`/prof/grade/${user_id}/list`);
    return response.data;
};

// 강의 정보 요청
export const getCourseData = async (course_id) => {
    const response = await axiosInstance.get(`/prof/grade/${course_id}`);
    return response.data;
};

// 강의 듣는 학생 정보 요청
export const getStudentData = async (course_id) => {
    const response = await axiosInstance.get(`/prof/grade/student/${course_id}`);
    return response.data;
};

// 학생 정보 업데이트
export const patchStudentScore = async (student) => {
    const response = await axiosInstance.patch(`/prof/grade/update`, { student });
    return response.data;
}