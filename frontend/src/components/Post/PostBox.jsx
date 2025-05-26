// components/Post/PostBox.jsx
import React from "react";
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

      {attachment && (
        <div className="post-attachment">
          <span className="attachment-label">첨부파일:</span>
          <a
            href={attachment.url}
            download={attachment.name}
            className="attachment-link"
          >
            📎 {attachment.name}
          </a>
        </div>
      )}
    </div>
  );
}
