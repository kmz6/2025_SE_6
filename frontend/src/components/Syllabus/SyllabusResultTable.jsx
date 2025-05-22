import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const Row = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

export default function SyllabusResultTable({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (courseId) => {
    navigate(`/syllabus/student/${courseId}`);
  };

  if (results.length === 0) {
    return <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>학정번호</Th>
          <Th>과목명</Th>
          <Th>이수구분</Th>
          <Th>학점</Th>
          <Th>강의시간</Th>
          <Th>교수</Th>
        </tr>
      </thead>
      <tbody>
        {results.map((course) => (
          <Row key={course.course_id} onClick={() => handleRowClick(course.course_id)}>
            <Td>{course.course_code}</Td>
            <Td>{course.course_name}</Td>
            <Td>{course.course_type}</Td>
            <Td>{course.credit}</Td>
            <Td>{formatTime(course.time)}</Td>
            <Td>{course.faculty_id}</Td>
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