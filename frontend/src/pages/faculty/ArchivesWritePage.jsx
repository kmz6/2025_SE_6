import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./ArchivesWritePage.css";

export default function ArchivesWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (formData, values) => {
    console.log("자료실 등록:", values);
    navigate(`/archives/${lectureId}`);
  };

  return (
    <div className="archives-write-container">
      <h1 className="board-title">강의 자료 등록</h1>
      <PostHeader subjectName="과목명" subjectCode="학정번호" />
      <PostWriteForm onSubmit={handleSubmit} />
    </div>
  );
}
