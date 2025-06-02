import axiosInstance from "../axiosInstance";

export const postMember = async (data) => {
  const response = await axiosInstance.post(`/staff/member`, data);
  return response.data;
};

export const deleteMember = async (staffId) => {
  const response = await axiosInstance.delete(
    `/staff/member/${staffId}`,
    staffId
  );
  return response.data;
};
