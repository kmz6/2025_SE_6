import React from "react";
import { useNavigate } from "react-router-dom";
import { courseData } from "../mocks/courseData";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 2rem;
  width: 100%
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
`;

const LectureCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const LectureName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const TimeText = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.8rem;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #1a73e8;
  color: white;
  cursor: pointer;
`;

const ProfSyllabusListPage = () => {
  const navigate = useNavigate();
  const professorId = "2022000000"; // 임시 교수 ID

  const myLectures = courseData.filter((c) => c.faculty_id === professorId);

  return (
    <PageWrapper>
      <SectionTitle>강의계획서 작성</SectionTitle>

      {myLectures.map((lec) => (
        <LectureCard key={lec.course_id}>
          <LectureName>{lec.course_name}</LectureName>
          <TimeText>
            시간: {lec.time.map((t) => `${t.course_day}${t.course_period}`).join(", ")}
          </TimeText>
          <Button onClick={() => navigate(`/syllabus/professor/${lec.course_id}`)}>
            작성
          </Button>
        </LectureCard>
      ))}
    </PageWrapper>
  );
};

export default ProfSyllabusListPage;