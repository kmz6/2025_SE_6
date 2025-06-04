import axiosInstance from "../../apis/axiosInstance";

// 1. 수강생 + 출석 상태 불러오기
export const fetchAttendanceData = async (courseId, week, session) => {
  try {
    const res = await axiosInstance.get(`/api/faculty/attendance/${courseId}/students`, {
      params: { week, session }
    });
    return res.data;
  } catch (err) {
    console.error("출석 정보 불러오기 실패:", err);
    return [];
  }
};

// 2. 출석 저장
export const saveAttendanceData = async (courseId, week, session, attendance) => {
  try {
    const records = Object.entries(attendance).map(([student_id, status]) => ({
      student_id,
      status
    }));
    await axiosInstance.post(`/api/faculty/attendance/${courseId}/save`, {
      week,
      session,
      records
    });
  } catch (err) {
    console.error("출석 저장 실패:", err);
    throw err;
  }
};