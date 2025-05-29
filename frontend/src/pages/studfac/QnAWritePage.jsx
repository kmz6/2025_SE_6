import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./QnAWritePage.css";

export default function QnAWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (formData, values) => {
    console.log("QnA 등록:", values);
    navigate(`/qna/${lectureId}`);
  };

  return (
    <div className="qna-write-container">
      <h1 className="board-title">Q&A 작성</h1>
      <PostHeader subjectName="과목명" subjectCode="학정번호" />
      <PostWriteForm onSubmit={handleSubmit} />
    </div>
  );
}
