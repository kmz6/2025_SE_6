import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../components/Board/BoardHeader";
import "./AssignListPage.css";

const dummyAssignments = [
  {
    id: 1,
    title: "1주차 과제",
    startDate: "2025-05-30",
    dueDate: "2025-06-01",
    status: "제출 완료",
  },
  {
    id: 2,
    title: "2주차 과제",
    startDate: "2025-06-01",
    dueDate: "2025-06-08",
    status: "미제출",
  },
];

export default function AssignListPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="assignment-list-container">
      <h1 className="board-title">과제 목록</h1>

      <BoardHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onWrite={() => navigate(`/assignment/${lectureId}/write`)}
      />

      <table className="assignment-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>제출 기간</th>
            <th>제출 상태</th>
          </tr>
        </thead>
        <tbody>
            {dummyAssignments.map((a, index) => (
                <tr key={a.id} onClick={() => navigate(`/assignment/${lectureId}/${a.id}`)}>
                <td>{index + 1}</td>
                <td>{a.title}</td>
                <td className="date-cell">
                    {a.startDate}
                    <br />
                    ~ {a.dueDate}
                </td>
                <td className={a.status === "제출 완료" ? "submitted" : "not-submitted"}>
                    {a.status}
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
