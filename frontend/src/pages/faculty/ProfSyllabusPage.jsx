import React from "react";
import { useParams } from "react-router-dom";
import CoursePlanForm from "../../components/Syllabus/SyllabusForm";
import { courseData } from "../../mocks/courseData";
import styled from "styled-components";

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

export default function ProfSyllabusPage() {
  const { lectureId } = useParams();

  const course = courseData.find(
    (c) => String(c.course_id) === String(lectureId)
  );

  const handleSubmit = (form) => {
    console.log("제출된 강의계획서:", form);
    // TODO: 나중에 fetch("/api/save-syllabus", ...) 등으로 백엔드 연동
  };

  if (!course) {
    return <Container>해당 강의 정보를 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Title>강의계획서 작성</Title>
      <CoursePlanForm initialData={course} onSubmit={handleSubmit} />
    </Container>
  );
}
