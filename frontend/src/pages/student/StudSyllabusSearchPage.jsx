import React, { useState, useEffect } from "react";
import SyllabusFilterForm from "../../components/Syllabus/SyllabusFilterForm";
import SyllabusResultTable from "../../components/Syllabus/SyllabusResultTable";
import { Container, Title } from "../../styles/Syllabus.style";
import { getSyllabusList } from "../../apis/syllabus/syllabus";

export default function StudSyllabusSearchPage() {
  const [filters, setFilters] = useState({
    courseName: "",
    professor: "",
    semester: "2025-1",
  });

  const [courses, setCourses] = useState([]);

  // DB에서 강의 전체 리스트 가져오기
  useEffect(() => {
    getSyllabusList()
      .then((data) => {
        console.log("불러온 강의 목록:", data);
        setCourses(data);
      })
      .catch((err) => console.error("강의 목록 불러오기 실패", err));
  }, []);
  // 필터링
  const filteredResults = courses.filter((course) => {
    const nameMatch = (course.course_name || "").includes(filters.courseName);
    const profMatch = (course.faculty_name || "").includes(filters.professor);
    
    const fullSemester = `${course.course_year}-${course.course_semester}`;
    const semMatch = fullSemester === filters.semester;

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