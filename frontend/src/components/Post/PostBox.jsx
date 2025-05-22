import React from "react";
import "./PostBox.css";

export default function PostBox({ title, author, date, content }) {
  return (
    <div className="post-box">
      <div className="post-title">{title}</div>
      <div className="post-meta">
        <span>{author}</span>
        <span>{date}</span>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
}
