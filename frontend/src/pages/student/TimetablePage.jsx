import React, { useEffect, useState } from "react";
import Timetable from "../../components/Timetable";
import { Container, Title } from "../../styles/MyPage.style";
import { getTimetable } from "../../apis/timetable/timetable";

function TimetablePage() {
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({
    year: "2025",
    semester: "1",
  });

  useEffect(() => {
    const student_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    if (!student_id) return;

    const fetchData = async () => {
      try {
        const data = await getTimetable(student_id);
        setSubjects(data);
      } catch (err) {
        console.error("시간표 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  const filteredSubjects = subjects.filter(
    (s) =>
      s &&
      s.course_year?.toString() === filters.year &&
      s.course_semester?.toString() === filters.semester
  );

  return (
    <Container>
      <Title>시간표</Title>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <select
          value={`${filters.year}-${filters.semester}`}
          onChange={(e) => {
            const [year, semester] = e.target.value.split("-");
            setFilters({ year, semester });
          }}
        >
          <option value="2025-1">2025년 1학기</option>
          <option value="2024-2">2024년 2학기</option>
        </select>
      </div>
      <Timetable subjects={filteredSubjects} />
    </Container>
  );
}

export default TimetablePage;