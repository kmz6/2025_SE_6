import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { Container, Title, Button as CommonButton } from "../../styles/Syllabus.style";
import { getProfessorCourses } from "../../apis/syllabus/syllabus";

const LectureCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background-color: #f9f9f9;
`;

const LectureName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const TimeText = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 0.5rem;
`;

const ProfSyllabusListPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [myLectures, setMyLectures] = useState([]);
  const [filters] = useState({
    year: "2025",
    semester: "1",
  }); // 현재 학기에 맞춰 수정하면 됨

  useEffect(() => {
    if (user) {
      getProfessorCourses(user.user_id)
        .then((data) => setMyLectures(data))
        .catch((err) => console.error("강의 목록 불러오기 실패", err));
    }
  }, [user]);

  if (!user) return <Container>로딩 중...</Container>;

  const filteredLectures = myLectures.filter(
    (lec) =>
      lec &&
      lec.course_year?.toString() === filters.year &&
      lec.course_semester?.toString() === filters.semester
  );

  return (
    <Container>
      <Title>강의계획서 작성</Title>

      {filteredLectures.map((lec) => (
        <LectureCard key={lec.course_code}>
          <LectureName>{lec.course_name}</LectureName>
          <TimeText>강의코드: {lec.course_code}</TimeText>
          <CommonButton onClick={() => navigate(`${lec.course_code}`)}>
            작성
          </CommonButton>
        </LectureCard>
      ))}
    </Container>
  );
};
export default ProfSyllabusListPage;