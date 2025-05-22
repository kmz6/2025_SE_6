import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader";
import "./NoticeWritePage.css";

export default function NoticeWritePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // 첨부파일 상태

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    console.log("제출 데이터:", {
      title,
      content,
      file,
    });

    // TODO: 여기에 fetch 또는 axios를 사용한 POST 요청 작성
    // ex) axios.post('/api/notice', formData)

    navigate(`/notice/${lectureId}`);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="notice-write-container">
      <h1 className="board-title">공지사항 작성</h1>

      <PostHeader
        subjectName={`과목명 ${lectureId}`}
        subjectCode="학정번호"
      />

      <div className="write-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <div className="file-upload">
          <label htmlFor="file">첨부파일</label>
          <input type="file" id="file" onChange={handleFileChange} />
          {file && <p className="file-name">📎 {file.name}</p>}
        </div>

        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-textarea"
        />

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          등록
        </button>
      </div>
    </div>
  );
}
