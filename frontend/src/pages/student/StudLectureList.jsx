import React from "react";
import { useNavigate } from "react-router-dom";
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 70px;
`;

const Row = styled.tr`
  border: 1px solid #ccc;
`;

const CellHead = styled.td`
  width: 10%;
  padding: 15px;
  font-weight: bold;
  background-color: #f3f6f9;
  border: 1px solid #ccc;
`;

const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

const mockSubjects = [
  { name: "정보보호이론", day: "월", time: 2, color: "#e7b4f0", lectureId: 1 },
  { name: "소프트웨어공학", day: "월", time: 5, color: "#a0e2e2", lectureId: 2 },
  { name: "생명과기술", day: "월", time: 6, color: "#f3cc7f", lectureId: 3 },
  { name: "산학협력캡스톤설계", day: "화", time: 5, color: "#d9b4f0", lectureId: 4 },
  { name: "생명과기술", day: "수", time: 5, color: "#f3cc7f", lectureId: 3 },
  { name: "소프트웨어공학", day: "수", time: 6, color: "#a0e2e2", lectureId: 2 },
  { name: "산학협력캡스톤설계", day: "목", time: 6, color: "#d9b4f0", lectureId: 4 },
  { name: "클래식음악의역사", day: "토", time: 7, color: "#a4dfb7", lectureId: 5 },
];

const uniqueLectures = Array.from(
  new Map(
    mockSubjects.map((s) => [s.lectureId, { id: `${s.lectureId}`, name: s.name }])
  ).values()
);

const StudentLectureList = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>수강 강의 목록</Title>
      <Table>
        <thead>
          <Row>
            <CellHead>강의명</CellHead>
          </Row>
        </thead>
        <tbody>
          {uniqueLectures.map((lec) => (
            <Row
              key={lec.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/student/attendance/${lec.id}`)}
            >
              <Cell>{lec.name}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentLectureList;