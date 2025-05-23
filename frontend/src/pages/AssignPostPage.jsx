import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader";
import PostBox from "../components/Post/PostBox";
import PostWriteForm from "../components/Post/PostWriteForm";
import "./AssignPostPage.css";

export default function AssignPostPage() {
  const { lectureId, assignmentId } = useParams();
  const navigate = useNavigate();

  const dummyAssignment = {
    title: "과제 예시",
    startDate: "2025-06-01",
    dueDate: "2025-06-08",
    description: "주어진 자료를 참고하여 과제를 작성하고 제출하세요.",
    file: {
      name: "assignment.pdf",
      url: "/uploads/assignment.pdf",
    },
  };

  const handleSubmit = (formData, values) => {
    console.log("과제 제출됨:", values);
    navigate(`/assignment/${lectureId}`);
  };

  return (
    <div className="assign-post-container">
      <h1 className="board-title">과제 제출</h1>

      <PostHeader
        subjectName="과목명"
        subjectCode="학정번호"
      />

      <PostBox
        title={dummyAssignment.title}
        author="교수자"
        date={`${dummyAssignment.startDate} ~ ${dummyAssignment.dueDate}`}
        content={dummyAssignment.description}
        attachment={dummyAssignment.file}
      />

      <h2 className="submission-title">과제 제출란</h2>

      <PostWriteForm
        onSubmit={handleSubmit}
        showTitleInput={false}
        submitLabel="제출"
      />
    </div>
  );
}
