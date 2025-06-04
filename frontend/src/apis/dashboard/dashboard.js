import axiosInstance from "../axiosInstance";

export const getDashboard = async (userId) => {
  const response = await axiosInstance.get(`/dashboard/assignment`, {
    params: { user_id: userId },
  });
  return response.data;
};
