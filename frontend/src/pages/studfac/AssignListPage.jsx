import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../../components/Board/BoardHeader";
import "./AssignListPage.css";
import { useUser } from "../../context/UserContext";

const dummyAssignments = [
  {
    id: 1,
    title: "1주차 과제",
    startDate: "2025-05-30",
    dueDate: "2025-06-01",
    status: "제출 완료",
    submittedCount: 2,
    totalStudents: 3,
  },
  {
    id: 2,
    title: "2주차 과제",
    startDate: "2025-06-01",
    dueDate: "2025-06-08",
    status: "미제출",
    submittedCount: 2,
    totalStudents: 3,
  },
];

export default function AssignListPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const { user } = useUser();
  const userType = user?.user_type;
  const studentId = user?.user_id;

  return (
    <div className="assignment-list-container">
      <h1 className="board-title">과제 목록</h1>

      <BoardHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onWrite={() => navigate(`/professor/assignment/${lectureId}/write`)}
        userType={userType}
      />

      <table className="assignment-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>제출 기간</th>
            {userType === "faculty" && <th>제출률</th>}
            {userType === "student" && <th>제출 상태</th>}
          </tr>
        </thead>
        <tbody>
          {dummyAssignments.map((a, index) => {
            const submitRate = a.totalStudents
              ? ((a.submittedCount / a.totalStudents) * 100).toFixed(1) + "%"
              : "-";

            return (
              <tr
                key={a.id}
                onClick={() => {
                  if (userType === "faculty") {
                    navigate(`/professor/assignment/${lectureId}/`);
                  } else if (userType === "student") {
                    if (a.status === "제출 완료") {
                      // 제출 상태일 때
                      navigate(`/assignment/${lectureId}/${a.id}/${studentId}`);
                    } else {
                      // 미제출 상태일 때
                      navigate(`/student/assignment/${lectureId}/${a.id}`);
                    }
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{a.title}</td>
                <td className="date-cell">
                  {a.startDate}
                  <br />~ {a.dueDate}
                </td>

                {userType === "faculty" ? (
                  <td>{submitRate}</td>
                ) : (
                  <td className={a.status === "제출 완료" ? "submitted" : "not-submitted"}>
                    {a.status}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
