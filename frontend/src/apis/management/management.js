import axiosInstance from "../axiosInstance";

export const postMember = async (data) => {
  const response = await axiosInstance.post(`/staff/member`, data);
  return response.data;
};
