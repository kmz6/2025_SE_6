import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMyLectures = (studentId) => {
  return useQuery({
    queryKey: ["myLectures", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const res = await axios.get(`http://localhost:3000/api/student/${studentId}/lectures`);
      console.log("👉 백엔드 응답:", res.data);
      return res.data ?? [];
    },
    enabled: !!studentId,
  });
};
