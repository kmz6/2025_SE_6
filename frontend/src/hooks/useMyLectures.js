import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axiosInstance";

export const useMyLectures = (studentId) => {
  return useQuery({
    queryKey: ["myLectures", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const res = await axiosInstance.get(`/api/student/${studentId}/lectures`);
      return res.data ?? [];
    },
    enabled: !!studentId,
  });
};
