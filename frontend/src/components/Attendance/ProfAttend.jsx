import React, { useState } from "react";

const mockStudents = [
  { id: "2022202100", name: "안태규", major: "컴퓨터정보공학부" },
  { id: "2022202101", name: "편성현", major: "컴퓨터정보공학부" },
  { id: "2022202102", name: "권세혁", major: "컴퓨터정보공학부" },
  { id: "2022202103", name: "고강훈", major: "컴퓨터정보공학부" },
];

const attendanceOptions = ["출석", "지각", "결석", "공결"];

const ProfAttend = () => {
  const [attendance, setAttendance] = useState({});

  const handleChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>출석부</h2>
      <table border="1" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>학과</th>
            <th>학번</th>
            <th>이름</th>
            <th>출석 선택</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {mockStudents.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.major}</td>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>
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
              </td>
              <td>{attendance[stu.id] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfAttend;