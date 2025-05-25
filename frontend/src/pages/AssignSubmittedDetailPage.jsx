import React from "react";
//import { useParams } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader";
import PostBox from "../components/Post/PostBox";
import "./AssignSubmittedDetailPage.css";

export default function AssignSubmittedDetailPage() {
  //const { lectureId, assignmentId, studentId } = useParams();

  const dummySubmission = {
    assignmentTitle: "3주차 API 과제",
    studentName: "김학생",
    submittedAt: "2025-06-03",
    content: `API 구현 완료 후 테스트까지 수행했습니다.
자세한 내용은 첨부파일 참고 바랍니다.`,
    file: {
      name: "assignment_report.pdf",
      url: "/uploads/assignment_report.pdf",
    },
  };

  return (
    <div className="assign-submitted-detail-container">
      <h1 className="board-title">제출된 과제</h1>

      <PostHeader subjectName="과목명" subjectCode="학정번호" />

      <PostBox
        title={dummySubmission.assignmentTitle}
        author={dummySubmission.studentName}
        date={dummySubmission.submittedAt}
        content={dummySubmission.content}
        attachment={dummySubmission.file}
      />
    </div>
  );
}
