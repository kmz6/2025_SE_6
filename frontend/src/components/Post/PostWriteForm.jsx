// components/Post/PostWriteForm.jsx
import React, { useState } from "react";
import "./PostWriteForm.css";

export default function PostWriteForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

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

    onSubmit(formData, { title, content, file });
  };

  return (
    <div className="write-form">
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <div className="file-upload">
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
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
  );
}
