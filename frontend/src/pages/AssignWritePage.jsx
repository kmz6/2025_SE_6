import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader";
import PostWriteForm from "../components/Post/PostWriteForm";
import "./AssignWritePage.css";

export default function AssignWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (formData, values) => {
    console.log("과제 등록됨:", values);

    navigate(`/assignment/${lectureId}`);
  };

  return (
    <div className="assign-write-container">
      <h1 className="board-title">과제 등록</h1>

      <PostHeader
        subjectName={`과목명 ${lectureId}`}
        subjectCode="학정번호"
      />

      <PostWriteForm
        onSubmit={handleSubmit}
        showTitleInput={true}
        submitLabel="등록"
      />
    </div>
  );
}
