import React from "react";
import { useParams } from "react-router-dom";
import StudAttend from "../../components/Attendance/StudAttend";

const StudAttendPage = () => {
  const { lectureId } = useParams();

  return <StudAttend lectureId={lectureId} />;
};

export default StudAttendPage;
