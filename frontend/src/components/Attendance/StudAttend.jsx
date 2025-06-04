import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../apis/axiosInstance";

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
const statusToSymbol = {
  attend: "O",
  absent: "X",
  late: "L",
  excused: "A",
};
const StudAttend = () => {
  const { lectureId } = useParams();
  const [meta, setMeta] = useState({});
  const [attendanceTable, setAttendanceTable] = useState([]);
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metaRes = await axiosInstance.get(`/api/student/attendance/${lectureId}/meta`);
        setMeta(metaRes.data);

        // 출석 정보
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        const studentId = storedUser?.user_id;
        console.log(studentId);
        const attRes = await axiosInstance.get(`/api/student/attendance/${lectureId}/status`, {
          params: { studentId },
        });

        const table = Array.from({ length: 16 }, () => Array(4).fill(" "));
        const dates = Array.from({ length: 16 }, () => Array(4).fill(""));

        attRes.data.forEach(({ attend_week, attend_session, attend_status, date }) => {
          table[attend_week - 1][attend_session - 1] = attend_status;
          dates[attend_week - 1][attend_session - 1] = date;
        });

        setAttendanceTable(table);
        setAttendanceDates(dates);
      } catch (err) {
        console.error("출석 데이터 불러오기 실패", err);
      }
    };

    fetchData();

  }, [lectureId]);

  return (
    <Container>
      <Title>{meta.subject} 출석 현황</Title>
      <Table>
        <tbody>
          <Row>
            <CellHead>교과목명</CellHead>
            <Cell>{meta.subject}</Cell>
            <CellHead>년도/학기</CellHead>
            <Cell>{meta.yearSemester}</Cell>
          </Row>
          <Row>
            <CellHead>학점/시간</CellHead>
            <Cell>{meta.credit}</Cell>
            <CellHead>강의시간</CellHead>
            <Cell>{meta.time}</Cell>
          </Row>
          <Row>
            <CellHead>담당교수</CellHead>
            <Cell>{meta.professor}</Cell>
            <Cell colSpan="2" style={{ fontWeight: "bold" }}>
              ※ 출석기호: O:출석 / X:결석 / L:지각 / A:공결
            </Cell>
          </Row>
        </tbody>
      </Table>

      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
        ※ 온라인과목 출결기준<br />
        - 출석인정기간(학습인정기간)에 학습 시작 및 완료(진도율 100% 달성)한 경우 : <b>출석</b><br />
        - 출석인정기간(학습인정기간) 종료 후, 학습완료(진도율 100% 달성)한 경우 : <b>지각</b><br />
        - 지각인정기간 종료 후 학습을 완료(진도율 100% 달성)한 경우 : <b>결석</b><br />
        - 학생이 학습을 전혀 하지 않은 경우: <b>(공란)결석</b><br />
        - 출석인정기간에 보는 것 시작했으나 완료 못한 경우 : <b>(공란)결석</b>
      </div>

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
                  {statusToSymbol[attendanceTable[i]?.[j]] || " "}
                  <br />
                  {attendanceDates[i]?.[j] ? `(${attendanceDates[i][j]})` : ""}
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