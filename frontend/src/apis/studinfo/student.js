import axiosInstance from "../axiosInstance";

export const getStudInfo = async (user_id) => {
  const response = await axiosInstance.get(`/studInfo/${user_id}`);
  return response.data;
};