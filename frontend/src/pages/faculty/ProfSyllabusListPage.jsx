import React from "react";
import { useNavigate } from "react-router-dom";
import { courseData } from "../../mocks/courseData";
import styled from "styled-components";
import { useUser } from "../../context/UserContext"; // ✅ 추가
import { Container, Title, Button as CommonButton } from "../../styles/Syllabus.style";

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
  const { user } = useUser(); // ✅ 현재 로그인된 교수 정보

  if (!user) return <Container>로딩 중...</Container>;

  const myLectures = courseData.filter((c) => c.faculty_id === user.user_id);

  return (
    <Container>
      <Title>강의계획서 작성</Title>

      {myLectures.map((lec) => (
        <LectureCard key={lec.course_id}>
          <LectureName>{lec.course_name}</LectureName>
          <TimeText>
            시간:{" "}
            {lec.time.map((t) => `${t.course_day}${t.course_period}`).join(", ")}
          </TimeText>
          <CommonButton onClick={() => navigate(`${lec.course_id}`)}>
            작성
          </CommonButton>
        </LectureCard>
      ))}
    </Container>
  );
};

export default ProfSyllabusListPage;