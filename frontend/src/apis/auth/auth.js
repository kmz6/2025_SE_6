import axiosInstance from "../axiosInstance";

export const postLogin = async (user_id, password) => {
  const response = await axiosInstance.post("/users/login", {
    user_id,
    password,
  });
  return response.data;
};
