import React from "react";
import { useNavigate } from "react-router-dom";

const mockLectures = [
  { id: "lec001", name: "산학협력캡스톤설계" },
  { id: "lec002", name: "소프트웨어공학" },
];

const StudentLectureList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>수강 강의 목록</h2>
      <ul>
        {mockLectures.map((lec) => (
          <li
            key={lec.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/attendance/student/${lec.id}`)}
          >
            {lec.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentLectureList;
