import axiosInstance from "../axiosInstance";

export const getSyllabusList = async () => {
  const res = await axiosInstance.get("/api/syllabus/list");
  return res.data;
};

export const getCourseDetail = async (courseCode) => {
  const res = await axiosInstance.get(`/api/syllabus/detail/${courseCode}`);
  return res.data;
};

export const getProfessorCourses = async (facultyId) => {
  const res = await axiosInstance.get(`/api/syllabus/prof/list?facultyId=${facultyId}`);
  return res.data;
};

export const updateCourseDetail = async (courseCode, updatedData) => {
  const res = await axiosInstance.put(`/api/faculty/syllabus/update/${courseCode}`, updatedData);
  return res.data;
};