import axiosInstance from "../axiosInstance";

export const getMyInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`/my/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "사용자 조회 실패");
  }
};
