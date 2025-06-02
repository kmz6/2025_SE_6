import axiosInstance from "../axiosInstance";

export const resetPassword = async ({ user_id, name, email }) => {
  const response = await axiosInstance.post("/users/resetpwd", {
    user_id,
    name,
    email,
  });
  return response.data;
};