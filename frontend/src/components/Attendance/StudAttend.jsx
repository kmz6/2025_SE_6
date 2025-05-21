import React from "react";

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
    <div style={{ padding: "20px" }}>
      <h2>{mockMeta.subject} 출석 현황</h2>

      {/* 상단 정보 */}
      <table border="1" style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}>
        <tbody>
          <tr>
            <td><b>교과목명</b></td><td>{mockMeta.subject}</td>
            <td><b>년도/학기</b></td><td>{mockMeta.yearSemester}</td>
          </tr>
          <tr>
            <td><b>학점/시간</b></td><td>{mockMeta.credit}</td>
            <td><b>강의시간</b></td><td>{mockMeta.time}</td>
          </tr>
          <tr>
            <td><b>담당교수</b></td><td>{mockMeta.professor}</td>
            <td colSpan="2"><b>※ 출석기호:</b> O:출석 / X:결석 / L:지각 / A:공결</td>
          </tr>
        </tbody>
      </table>

      {/* 출결 기준 설명 */}
      <div style={{ marginBottom: "15px", fontSize: "14px", color: "#555" }}>
        ※ 온라인과목 출결기준<br />
        - 출석인정기간 내 100% 완료: <b>출석</b><br />
        - 이후 완료: <b>지각</b><br />
        - 완료 못 함: <b>결석</b><br />
        - 시작조차 안 함: <b>공결(결석)</b>
      </div>

      {/* 출석 테이블 */}
      <table border="1" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>주차</th>
            {[1, 2, 3, 4].map(n => (
              <th key={n}>회차 {n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 16 }, (_, i) => (
            <tr key={i}>
              <td>{i + 1}주차</td>
              {[0, 1, 2, 3].map(j => (
                <td key={j}>
                  {attendanceTable[i]?.[j] || "-"}<br />
                  {attendanceDates[i]?.[j] ? `(${attendanceDates[i][j]})` : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudAttend;