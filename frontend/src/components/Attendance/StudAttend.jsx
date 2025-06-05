import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";
import * as S from "../../styles/Attend.style";

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
    <S.Container>
      <S.Title>{meta.subject} 출석 현황</S.Title>
      <S.Table>
        <tbody>
          <S.Row>
            <S.CellHead>교과목명</S.CellHead>
            <S.Cell>{meta.subject}</S.Cell>
            <S.CellHead>년도/학기</S.CellHead>
            <S.Cell>{meta.yearSemester}</S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>학점/시간</S.CellHead>
            <S.Cell>{meta.credit}</S.Cell>
            <S.CellHead>강의시간</S.CellHead>
            <S.Cell>{meta.time}</S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>담당교수</S.CellHead>
            <S.Cell>{meta.professor}</S.Cell>
            <S.Cell colSpan="2" style={{ fontWeight: "bold" }}>
              ※ 출석기호: O:출석 / X:결석 / L:지각 / A:공결
            </S.Cell>
          </S.Row>
        </tbody>
      </S.Table>

      <div style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
        ※ 온라인과목 출결기준<br />
        - 출석인정기간(학습인정기간)에 학습 시작 및 완료(진도율 100% 달성)한 경우 : <b>출석</b><br />
        - 출석인정기간(학습인정기간) 종료 후, 학습완료(진도율 100% 달성)한 경우 : <b>지각</b><br />
        - 지각인정기간 종료 후 학습을 완료(진도율 100% 달성)한 경우 : <b>결석</b><br />
        - 학생이 학습을 전혀 하지 않은 경우: <b>(공란)결석</b><br />
        - 출석인정기간에 보는 것 시작했으나 완료 못한 경우 : <b>(공란)결석</b>
      </div>

      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>주차</S.CellHead>
            {[1, 2, 3, 4].map((n) => (
              <S.CellHead key={n}>회차 {n}</S.CellHead>
            ))}
          </S.Row>
        </thead>
        <tbody>
          {Array.from({ length: 16 }, (_, i) => (
            <S.Row key={i}>
              <S.Cell>{i + 1}주차</S.Cell>
              {[0, 1, 2, 3].map((j) => (
                <S.Cell key={j}>
                  {statusToSymbol[attendanceTable[i]?.[j]] || " "}
                  <br />
                  {attendanceDates[i]?.[j] ? `(${attendanceDates[i][j]})` : ""}
                </S.Cell>
              ))}
            </S.Row>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default StudAttend;