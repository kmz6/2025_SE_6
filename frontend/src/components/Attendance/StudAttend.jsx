import React from "react";
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

const mockMeta = {
  subject: "산학협력캡스톤설계",
  yearSemester: "2025/1",
  credit: "3/3",
  time: "화5 목6",
  professor: "이형근",
};

const attendanceTable = [
  ["O", "O", "", ""], // 1주차
  ["O", "", "", ""],  // 2주차
  ["", "", "", ""],   // 3주차
  ["", "", "", ""],   // 4주차
];

const attendanceDates = [
  ["20250308", "20250308", "", ""],
  ["20250315", "", "", ""],
  ["20250322", "", "", ""],
  ["20250329", "", "", ""],
];

const StudAttend = ({ lectureId }) => {
  return (
    <Container>
      <Title>{mockMeta.subject} 출석 현황</Title>

      {/* 상단 정보 테이블 */}
      <Table>
        <tbody>
          <Row>
            <CellHead>교과목명</CellHead>
            <Cell>{mockMeta.subject}</Cell>
            <CellHead>년도/학기</CellHead>
            <Cell>{mockMeta.yearSemester}</Cell>
          </Row>
          <Row>
            <CellHead>학점/시간</CellHead>
            <Cell>{mockMeta.credit}</Cell>
            <CellHead>강의시간</CellHead>
            <Cell>{mockMeta.time}</Cell>
          </Row>
          <Row>
            <CellHead>담당교수</CellHead>
            <Cell>{mockMeta.professor}</Cell>
            <Cell colSpan="2" style={{ fontWeight: "bold" }}>
              ※ 출석기호: O:출석 / X:결석 / L:지각 / A:공결
            </Cell>
          </Row>
        </tbody>
      </Table>

      {/* 출결 기준 설명 */}
      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
        ※ 온라인과목 출결기준<br />
        - 출석인정기간(학습인정기간)에 학습 시작 및 완료(진도율 100% 달성)한 경우 : <b>출석</b><br />
        - 출석인정기간(학습인정기간) 종료 후, 학습완료(진도율 100% 달성)한 경우 : <b>지각</b><br />
        - 지각인정기간 종료 후 학습을 완료(진도율 100% 달성)한 경우 : <b>결석</b><br />
        - 학생이 학습을 전혀 하지 않은 경우: <b>(공란)결석</b><br />
        - 출석인정기간에 보는 것 시작했으나 완료 못한 경우 : <b>(공란)결석</b>
      </div>

      {/* 출석 테이블 */}
      <Table>
        <thead>
          <Row>
            <CellHead>주차</CellHead>
            {[1, 2, 3, 4].map((n) => (
              <CellHead key={n}>회차 {n}</CellHead>
            ))}
          </Row>
        </thead>
        <tbody>
          {Array.from({ length: 16 }, (_, i) => (
            <Row key={i}>
              <Cell>{i + 1}주차</Cell>
              {[0, 1, 2, 3].map((j) => (
                <Cell key={j}>
                  {attendanceTable[i]?.[j] || " "}
                  <br />
                  {attendanceDates[i]?.[j]
                    ? `(${attendanceDates[i][j]})`
                    : ""}
                </Cell>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudAttend;