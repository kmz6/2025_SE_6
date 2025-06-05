import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axiosInstance";

export const useMyLectures = (userId, userType) => {
  return useQuery({
    queryKey: ["myLectures", userId, userType],
    queryFn: async () => {
      if (!userId) return [];
      
      const url =
        userType === "student"
          ? `/api/student/${userId}/lectures`
          : `/api/faculty/${userId}/lectures`;

      const res = await axiosInstance.get(url);
      return res.data ?? [];
    },
    enabled: !!userId && !!userType,
  });
};
