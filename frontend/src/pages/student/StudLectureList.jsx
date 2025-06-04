import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { getStudentLectures } from "../../apis/attendance/attendance"; // 요거 바꿔야 해

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

const StudentLectureList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [myLectures, setMyLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      if (user) {
        const data = await getStudentLectures(user.user_id);
        const filtered = data.filter((lec) => lec.semester === "25-1");
        console.log(filtered);
        setMyLectures(filtered);
      }
    };
    fetchLectures();
  }, [user]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <Container>
      <Title>수강 강의 목록</Title>
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
              onClick={() => navigate(`/student/attendance/${lec.course_id}`)}
            >
              <Cell>{lec.course_name}</Cell>
              <Cell>{lec.course_times || "시간 미등록"}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentLectureList;