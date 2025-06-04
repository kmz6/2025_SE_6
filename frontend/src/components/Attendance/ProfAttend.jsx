import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchAttendanceData, saveAttendanceData } from "../../apis/attendance/attendance";

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

const OptionBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
  font-size: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  select {
    padding: 6px 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
`;

const attendanceOptions = ["출석", "지각", "결석", "공결"];

const ProfAttend = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [week, setWeek] = useState(1);
  const [session, setSession] = useState(1);

  const loadAttendance = async () => {
    const data = await fetchAttendanceData(courseId, week, session);
    setStudents(data);
    const existing = {};
    data.forEach((stu) => {
      if (stu.attend_status) existing[stu.student_id] = mapStatusToKorean(stu.attend_status);
    });
    setAttendance(existing);
  };

  useEffect(() => {
    console.log("useParams 결과:", courseId);
    loadAttendance();
  }, [courseId, week, session]);

  const handleChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleReset = () => {
    setAttendance({});
  };

  const handleSave = async () => {
    try {
      const mapped = Object.fromEntries(
        Object.entries(attendance).map(([id, status]) => [id, mapKoreanToStatus(status)])
      );
      await saveAttendanceData(courseId, week, session, mapped);
      alert("저장 완료!");
    } catch {
      alert("저장 실패!");
    }
  };

  return (
    <Container>
      <Title>출석부</Title>

      <OptionBox>
        <label>
          주차:
          <select value={week} onChange={(e) => setWeek(Number(e.target.value))}>
            {[...Array(16)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}주차
              </option>
            ))}
          </select>
        </label>
        <label>
          회차:
          <select value={session} onChange={(e) => setSession(Number(e.target.value))}>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}회차
              </option>
            ))}
          </select>
        </label>
      </OptionBox>

      <Table>
        <thead>
          <Row>
            <CellHead>학번</CellHead>
            <CellHead>이름</CellHead>
            <CellHead>출석 선택</CellHead>
            <CellHead>상태</CellHead>
          </Row>
        </thead>
        <tbody>
          {students.map((stu) => (
            <Row key={stu.student_id}>
              <Cell>{stu.student_id}</Cell>
              <Cell>{stu.name}</Cell>
              <Cell>
                {attendanceOptions.map((opt) => (
                  <label key={opt} style={{ marginRight: "5px" }}>
                    <input
                      type="radio"
                      name={`attend-${stu.student_id}`}
                      value={opt}
                      checked={attendance[stu.student_id] === opt}
                      onChange={(e) => handleChange(stu.student_id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </Cell>
              <Cell>{attendance[stu.student_id] || " "}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>

      <ButtonWrapper>
        <Button onClick={handleReset}>초기화</Button>
        <Button onClick={handleSave}>저장</Button>
      </ButtonWrapper>
    </Container>
  );
};

const mapStatusToKorean = (status) => {
  switch (status) {
    case "attend":
      return "출석";
    case "late":
      return "지각";
    case "absent":
      return "결석";
    case "excused":
      return "공결";
    default:
      return "";
  }
};

const mapKoreanToStatus = (kor) => {
  switch (kor) {
    case "출석":
      return "attend";
    case "지각":
      return "late";
    case "결석":
      return "absent";
    case "공결":
      return "excused";
    default:
      return null;
  }
};

export default ProfAttend;