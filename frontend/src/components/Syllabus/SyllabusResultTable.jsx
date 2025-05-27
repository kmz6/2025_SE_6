import React from "react";
import { useNavigate } from "react-router-dom";
import { facultyMap } from "../../mocks/courseData";
import { Table, Row, Cell, CellHead } from "../../styles/Syllabus.style";

export default function SyllabusResultTable({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (courseId) => {
    navigate(`/student/syllabus/${courseId}`);
  };

  if (results.length === 0) {
    return <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <CellHead>학정번호</CellHead>
          <CellHead>과목명</CellHead>
          <CellHead>이수구분</CellHead>
          <CellHead>학점</CellHead>
          <CellHead>강의시간</CellHead>
          <CellHead>교수</CellHead>
        </tr>
      </thead>
      <tbody>
        {results.map((course) => (
          <Row
            key={course.course_id}
            onClick={() => handleRowClick(course.course_id)}
            style={{ cursor: "pointer" }}
          >
            <Cell>{course.course_code}</Cell>
            <Cell>{course.course_name}</Cell>
            <Cell>{course.course_type}</Cell>
            <Cell>{course.credit}</Cell>
            <Cell>{formatTime(course.time)}</Cell>
            <Cell>{facultyMap[course.faculty_id]}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}

function formatTime(timeArr) {
  if (!timeArr || timeArr.length === 0) return "-";
  return timeArr.map((t) => `${t.course_day}${t.course_period}`).join(", ");
}