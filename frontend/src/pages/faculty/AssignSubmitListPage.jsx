import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import "./AssignSubmitListPage.css";
import PostBox from "../../components/Post/PostBox";

const dummyAssignment = {
  title: "2주차 과제",
  startDate: "2025-06-01",
  dueDate: "2025-06-08",
  description: "주어진 자료를 참고하여 문제를 해결하고 제출하세요.",
  file: {
    name: "assignment.pdf",
    url: "/uploads/assignment.pdf",
  },
};

const studentList = [
  { studentId: "2022202006", name: "학생1" },
  { studentId: "2022202012", name: "학생2" },
  { studentId: "2022202020", name: "학생3" },
];

const submissions = {
  2022202006: "2025-06-03",
  2022202012: "2025-06-04",
};

export default function AssignSubmitListPage() {
  const { lectureId, assignmentId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="assign-submit-list-container">
      <h1 className="board-title">제출된 과제 목록</h1>

      <PostHeader subjectName={`과목명 ${lectureId}`} subjectCode="학정번호" />

      <PostBox
        title={dummyAssignment.title}
        author="홍교수"
        date={`${dummyAssignment.startDate} ~ ${dummyAssignment.dueDate}`}
        content={dummyAssignment.description}
        attachment={dummyAssignment.file}
      />

      <table className="submit-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>학번</th>
            <th>이름</th>
            <th>제출일</th>
            <th>제출상태</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((s, idx) => {
            const submittedAt = submissions[s.studentId];
            const isSubmitted = Boolean(submittedAt);

            return (
              <tr
                key={s.studentId}
                className={isSubmitted ? "clickable" : ""}
                onClick={() =>
                  isSubmitted &&
                  navigate(
                    `/assignment/${lectureId}/${assignmentId}/submitted/${s.studentId}`
                  )
                }
              >
                <td>{idx + 1}</td>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{isSubmitted ? submittedAt : "-"}</td>
                <td className={isSubmitted ? "submitted" : "not-submitted"}>
                  {isSubmitted ? "제출" : "미제출"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
