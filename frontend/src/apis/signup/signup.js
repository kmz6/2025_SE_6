import axiosInstance from "../axiosInstance";

export const postSignup = async (signupData) => {
  const response = await axiosInstance.post("/users/signup", signupData);
  return response.data;
};