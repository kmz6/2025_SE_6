import axiosInstance from "../axiosInstance";

export const searchCourses = async (courseName, user_id) => {
  const response = await axiosInstance.get(`/sugang/search`, {
    params: { courseName, user_id },
  });
  return response.data;
};

export const registerCourse = async (data) => {
  const response = await axiosInstance.post(`/sugang/register`, data);
  return response.data;
};

export const deleteCourse = async (data) => {
  const response = await axiosInstance.post(`/sugang/delete`, data);
  return response.data;
};

export const getRegisteredCourses = async (user_id) => {
  const response = await axiosInstance.get(`/sugang/registered`, {
    params: { user_id },
  });
  return response.data;
};
