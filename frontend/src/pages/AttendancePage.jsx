import React from "react";
import StudentAttendance from "../components/Attendance/StudAttend";
import ProfessorAttendance from "../components/Attendance/ProfAttend";
import { useUser } from "../context/UserContext";

const AttendancePage = () => {
  const { user } = useUser(); // context에서 꺼내기

  if (user?.role === "student") return <StudentAttendance />;
  if (user?.role === "professor") return <ProfessorAttendance />;
  return <div>잘못된 접근입니다</div>;
};

export default AttendancePage;