import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLectureDetail = (lectureId) => {
  return useQuery({
    queryKey: ["lectureDetail", lectureId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/courses/${lectureId}`);
      return data;
    },
    enabled: !!lectureId, // lectureId 있을 때만 실행
  });
};
