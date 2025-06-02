import axiosInstance from "../axiosInstance";

export const getMyInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`/my/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "사용자 조회 실패");
  }
};

export const patchMyInfo = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/my/${userId}`, updatedData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "사용자 정보 수정 실패");
  }
};
