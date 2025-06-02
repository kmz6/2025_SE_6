import React, { useEffect, useState } from "react";
import Timetable from "../../components/Timetable";
import { Container, Title } from "../../styles/MyPage.style";
import { getTimetable } from "../../apis/timetable/timetable";

function TimetablePage() {
  const [subjects, setSubjects] = useState([]);

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

  return (
    <Container>
      <Title>시간표</Title>
      <Timetable subjects={subjects} />
    </Container>
  );
}

export default TimetablePage;