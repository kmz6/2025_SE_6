import React from "react";
import "./PostHeader.css";

export default function PostHeader({ subjectName, subjectCode, onEdit, onDelete, authorId, currentUserId }) {
  const isAuthor = authorId === currentUserId;

  return (
    <div className="notice-header">
      <div className="subject-info">
        <span className="subject-name">{subjectName}</span>
        <span className="subject-code">/ {subjectCode}</span>
      </div>
      {isAuthor && (
        <div className="button-group">
          <button className="edit-button" onClick={onEdit}>수정</button>
          <button className="delete-button" onClick={onDelete}>삭제</button>
        </div>
      )}
    </div>
  );
}