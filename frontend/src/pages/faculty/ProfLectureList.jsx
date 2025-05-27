import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { courseData } from "../../mocks/courseData";
import { useUser } from "../../context/UserContext";

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
  margin-bottom: 30px;
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

// 고유한 lectureId + name 추출
const uniqueLectures = Array.from(
  new Map(
    mockSubjects.map((subj) => [
      subj.lectureId,
      {
        id: `${subj.lectureId}`,
        name: subj.name,
      },
    ])
  ).values()
);


const ProfLectureList = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // 로그인한 유저 정보 (user.user_id === faculty_id)

  if (!user) return <div>로딩 중...</div>;

  // 교수 본인의 강의만 필터링
  const myLectures = courseData.filter(
    (course) => course.faculty_id === user.user_id
  );

  return (
    <Container>
      <Title>담당 강의 목록</Title>
      <Table>
        <thead>
          <Row>
            <CellHead>강의명</CellHead>
            <CellHead>강의시간</CellHead>
          </Row>
        </thead>
        <tbody>
          {myLectures.map((lec) => (
            <Row
              key={lec.course_id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/professor/attendance/${lec.course_id}`)}
            >
              <Cell>{lec.course_name}</Cell>
              <Cell>
                {lec.time
                  .map((t) => `${t.course_day}${t.course_period}`)
                  .join(", ")}
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProfLectureList;