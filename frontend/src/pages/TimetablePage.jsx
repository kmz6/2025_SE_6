import React from "react";
import Timetable from "../components/Timetable";

const mockSubjects = [
  { name: "정보보호이론", day: "월", time: 2, color: "#e7b4f0" },
  { name: "소프트웨어공학", day: "월", time: 5, color: "#a0e2e2" },
  { name: "생명과기술", day: "월", time: 6, color: "#f3cc7f" },
  { name: "산학협력캡스톤설계", day: "화", time: 5, color: "#d9b4f0" },
  { name: "생명과기술", day: "수", time: 5, color: "#f3cc7f" },
  { name: "소프트웨어공학", day: "수", time: 6, color: "#a0e2e2" },
  { name: "산합협력캡스톤설계", day: "목", time: 6, color: "#d9b4f0" },
  { name: "클래식음악의역사", day: "토", time: 7, color: "#a4dfb7" },
];

function TimetablePage() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>시간표</h2>
      <Timetable subjects={mockSubjects} />
    </div>
  );
}

export default TimetablePage;