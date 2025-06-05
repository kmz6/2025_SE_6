import React, { useState, useEffect } from "react";
import "./PostWriteForm.css";

export default function PostWriteForm({
  onSubmit,
  initialValues = {},
  submitLabel = "등록",
  showDateInputs = false,
  disabled = false,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (initialValues) {
      if (initialValues.title !== undefined) setTitle(initialValues.title);
      if (initialValues.content !== undefined) setContent(initialValues.content);
      if (initialValues.start_date !== undefined) setStartDate(initialValues.start_date.slice(0, 10));
      if (initialValues.end_date !== undefined) setEndDate(initialValues.end_date.slice(0, 10));
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (disabled) return;
    if (!title?.trim?.() || !content?.trim?.()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (showDateInputs) {
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
    }
    if (file) {
      formData.append("file", file);
    }

    onSubmit(formData, {
      title,
      content,
      file,
      start_date: startDate,
      end_date: endDate,
    });
  };

  return (
    <div className="write-form">
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        disabled={disabled}
      />

      <div className="file-upload">
        <input
          type="file"
          id="file"
          accept=".pdf,.doc,.docx,.zip,.png,.jpg"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={disabled}
        />
        {file && <p className="file-name">{file.name}</p>}
      </div>

      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="content-textarea"
        disabled={disabled}
      />

      {showDateInputs && (
        <div className="date-inputs">
          <label>
            제출 시작일:{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={disabled}
            />
          </label>
          <label style={{ marginLeft: "1rem" }}>
            제출 마감일:{" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={disabled}
            />
          </label>
        </div>
      )}

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={disabled || !(title?.trim?.()) || !(content?.trim?.())}
      >
        {submitLabel}
      </button>
    </div>
  );
}
