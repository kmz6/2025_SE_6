import React from "react";
import { useNavigate } from "react-router-dom";
import { courseData } from "../../mocks/courseData";
import styled from "styled-components";
import { useUser } from "../../context/UserContext"; // ✅ 추가

const Container = styled.div`
  margin: 24px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #003366;
  border-bottom: 1px solid #003366;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

const CommonButton = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

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