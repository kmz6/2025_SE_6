import React from "react";
import { getDownLoad } from "../../apis/board/board";
import "./PostBox.css";

export default function PostBox({ title, author, date, content, attachment }) {
  return (
    <div className="post-box">
      <div className="post-title">{title}</div>

      <div className="post-meta">
        <span>{author}</span>
        <span>{date}</span>
      </div>

      <div className="post-content">{content}</div>

      {attachment && attachment.length > 0 && (
        <div className="post-attachment">
          <span className="attachment-label">첨부파일:</span>
          {attachment.map((file, idx) => (
            <span
              key={idx}
              onClick={() => {
                getDownLoad(file.file_name)
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = file.file_name;
                    link.click();
                    window.URL.revokeObjectURL(url);
                  })
                  .catch(err => {
                    console.error("다운로드 실패", err);
                  });
              }}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              📎 {file.file_name}
              {idx < attachment.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
