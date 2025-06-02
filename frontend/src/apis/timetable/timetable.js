import axiosInstance from "../axiosInstance";

export const getTimetable = async (student_id) => {
  const res = await axiosInstance.get(`/timetable/${student_id}`);
  return res.data;
};