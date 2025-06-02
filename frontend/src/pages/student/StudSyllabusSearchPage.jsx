import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SyllabusFilterForm from "../../components/Syllabus/SyllabusFilterForm";
import SyllabusResultTable from "../../components/Syllabus/SyllabusResultTable";
import { Container, Title } from "../../styles/Syllabus.style";
import { getSyllabusList } from "../../apis/syllabus/syllabus";

export default function StudSyllabusSearchPage() {
  const [filters, setFilters] = useState({
    courseName: "",
    professor: "",
    semester: "25-2",
  });

  const [courses, setCourses] = useState([]);

  // 🔹 DB에서 강의 전체 리스트 가져오기
  useEffect(() => {
  console.log("setCourses 확인:", setCourses);
  getSyllabusList()
    .then((data) => setCourses(data))
    .catch((err) => console.error("강의 목록 불러오기 실패", err));
}, []);
  // 🔹 필터링 조건 적용
  const filteredResults = courses.filter((course) => {
    const nameMatch = (course.course_name || "").includes(filters.courseName);
    const profMatch = (course.faculty_name || "").includes(filters.professor);
    const semMatch = filters.semester === "25-2"; // 예시 학기 필터
    return nameMatch && profMatch && semMatch;
  });

  return (
    <Container>
      <Title>강의계획서 조회</Title>
      <SyllabusFilterForm filters={filters} onChange={handleFilterChange} />
      <SyllabusResultTable results={filteredResults} />
    </Container>
  );

  function handleFilterChange(updatedFilters) {
    setFilters(updatedFilters);
  }
}