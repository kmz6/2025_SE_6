import axiosInstance from "../axiosInstance";

export const getMyInfo = async (userId) => {
  const response = await axiosInstance.get(`/my/${userId}`);
  return response.data;
};

export const patchMyInfo = async (userId, updatedData) => {
  const response = await axiosInstance.patch(`/my/${userId}`, updatedData);
  console.log(response.data);
  return response.data;
};

export const patchMyPassword = async (userId, passwordData) => {
  const response = await axiosInstance.patch(
    `/my/${userId}/password`,
    passwordData
  );
  console.log(response.data);
  return response.data;
};
