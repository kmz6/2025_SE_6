import axiosInstance from "../../apis/axiosInstance";

export const getLectureList = async (facultyId) => {
  try {
    const res = await axiosInstance.get(`/api/faculty/lecturelist/${facultyId}`);
    return res.data; // [{ course_id, course_name, ... }]
  } catch (error) {
    console.error("강의 목록 불러오기 실패:", error);
    return [];
  }
};