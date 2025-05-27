import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { courseData } from "../../mocks/courseData";

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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const Button = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const mockStudents = [
  { id: "2022202100", name: "안태규", major: "컴퓨터정보공학부" },
  { id: "2022202101", name: "편성현", major: "컴퓨터정보공학부" },
  { id: "2022202102", name: "권세혁", major: "컴퓨터정보공학부" },
  { id: "2022202103", name: "고강훈", major: "컴퓨터정보공학부" },
];

const attendanceOptions = ["출석", "지각", "결석", "공결"];

const ProfAttend = () => {
  const { courseId } = useParams(); // URL에서 course_id 받아오기
  const [attendance, setAttendance] = useState({});

  // 해당 강의 정보 찾기
  const lecture = courseData.find(
    (c) => String(c.course_id) === String(courseId)
  );

  const handleChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSave = () => {
    alert("저장되었습니다.");
  };

  return (
    <Container>
      <Title>출석부</Title>

      <Table>
        <thead>
          <Row>
            <CellHead>학과</CellHead>
            <CellHead>학번</CellHead>
            <CellHead>이름</CellHead>
            <CellHead>출석 선택</CellHead>
            <CellHead>상태</CellHead>
          </Row>
        </thead>
        <tbody>
          {mockStudents.map((stu) => (
            <Row key={stu.id}>
              <Cell>{stu.major}</Cell>
              <Cell>{stu.id}</Cell>
              <Cell>{stu.name}</Cell>
              <Cell>
                {attendanceOptions.map((opt) => (
                  <label key={opt} style={{ margin: "0 5px" }}>
                    <input
                      type="radio"
                      name={`attend-${stu.id}`}
                      value={opt}
                      checked={attendance[stu.id] === opt}
                      onChange={(e) => handleChange(stu.id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </Cell>
              <Cell>{attendance[stu.id] || " "}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>

      <ButtonWrapper>
        <Button onClick={handleSave}>저장</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default ProfAttend;