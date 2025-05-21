import React from "react";
import { useNavigate } from "react-router-dom";

const mockLectures = [
  { id: "lec100", name: "소프트웨어공학" },
  { id: "lec200", name: "산학협력캡스톤설계" },
];

const ProfessorLectureList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>담당 강의 목록</h2>
      <ul>
        {mockLectures.map((lec) => (
          <li
            key={lec.id}
            style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/attendance/professor/${lec.id}`)}
          >
            {lec.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorLectureList;