import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./NoticeWritePage.css";

export default function NoticeWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (formData, values) => {
    console.log("공지사항 등록:", values);
    navigate(`/notice/${lectureId}`);
  };

  return (
    <div className="notice-write-container">
      <h1 className="board-title">공지사항 작성</h1>
      <PostHeader subjectName="과목명" subjectCode="학정번호" />
      <PostWriteForm onSubmit={handleSubmit} />
    </div>
  );
}
