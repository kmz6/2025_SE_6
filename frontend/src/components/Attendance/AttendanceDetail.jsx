import React from "react";
import { useParams } from "react-router-dom";

const mockData = {
  lectureId: "lec001",
  name: "산학협력캡스톤설계",
  semester: "2025/1",
  credit: 3,
  weeks: [
    ["O", "O", "O", "", ""],
    ["O", "X", "", "", ""],
    ["", "O", "L", "", ""],
    ["", "", "", "", ""],
  ],
};

const AttendanceDetail = () => {
  const { lectureId } = useParams();
  const data = mockData; // 나중엔 lectureId 기반 API로 변경

  return (
    <div>
      <h2>{data.name} 출석 현황</h2>
      <p>학점: {data.credit} | 학기: {data.semester}</p>

      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>주차</th>
            {[1, 2, 3, 4, 5].map((n) => (
              <th key={n}>회차 {n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.weeks.map((week, i) => (
            <tr key={i}>
              <td>{i + 1}주차</td>
              {week.map((val, j) => (
                <td key={j}>{val || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDetail;