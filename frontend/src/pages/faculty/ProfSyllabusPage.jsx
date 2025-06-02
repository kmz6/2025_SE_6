import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoursePlanForm from "../../components/Syllabus/SyllabusForm";
import styled from "styled-components";
import { getCourseDetail, updateCourseDetail } from "../../apis/syllabus/syllabus";

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
  const [course, setCourse] = useState(null);

  useEffect(() => {
  getCourseDetail(lectureId)
    .then((data) => {
      console.log("받은 강의 데이터 👉", data); // 👈 이거 추가
      setCourse(data);
    })
    .catch((err) => console.error("강의 정보 불러오기 실패", err));
}, [lectureId]);

  const handleSubmit = (form) => {
    updateCourseDetail(lectureId, form)
      .then(() => alert("강의계획서가 저장되었습니다."))
      .catch((err) => console.error("강의계획서 저장 실패", err));
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