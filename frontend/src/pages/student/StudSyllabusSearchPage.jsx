import React, { useState } from "react";
import styled from "styled-components";
import { courseData } from "../../mocks/courseData";
import SyllabusFilterForm from "../../components/Syllabus/SyllabusFilterForm";
import SyllabusResultTable from "../../components/Syllabus/SyllabusResultTable";

const PageWrapper = styled.div`
  padding: 2rem;
  width: 100%;
`;

const ContextBox = styled.div`
  border: 1px solid #ccc;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
`;

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
    const profMatch = course.faculty_id.includes(filters.professor);
    const semMatch = filters.semester === "25-1"; // 예시
    return nameMatch && profMatch && semMatch;
  });

  return (
    <PageWrapper>
      <SectionTitle>강의계획서 조회</SectionTitle>
      <SyllabusFilterForm filters={filters} onChange={handleFilterChange} />
      <SyllabusResultTable results={filteredResults} />
    </PageWrapper>
  );
}
