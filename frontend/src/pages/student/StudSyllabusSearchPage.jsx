import React, { useState } from "react";
import styled from "styled-components";
import { courseData } from "../../mocks/courseData";
import SyllabusFilterForm from "../../components/Syllabus/SyllabusFilterForm";
import SyllabusResultTable from "../../components/Syllabus/SyllabusResultTable";
import { facultyMap } from "../../mocks/courseData";
import { Container, Title } from "../../styles/Syllabus.style";

export default function StudSyllabusSearchPage() {
  const [filters, setFilters] = useState({
    courseName: "",
    professor: "",
    semester: "25-1",
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filteredResults = courseData.filter((course) => {
    const nameMatch = course.course_name.includes(filters.courseName);
    const profMatch = facultyMap[course.faculty_id].includes(filters.professor);
    const semMatch = filters.semester === "25-1"; // 예시
    return nameMatch && profMatch && semMatch;
  });

  return (
    <Container>
      <Title>강의계획서 조회</Title>
      <SyllabusFilterForm filters={filters} onChange={handleFilterChange} />
      <SyllabusResultTable results={filteredResults} />
    </Container>
  );
}