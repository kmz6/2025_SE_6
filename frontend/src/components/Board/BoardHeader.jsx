import React from "react";
import "./BoardHeader.css";

export default function BoardHeader({ subjectName, subjectCode, onWrite, userType }) {
  return (
    <div className="board-header">
      <div className="subject-info">
        <span className="subject-name">{subjectName}</span>
        <span className="subject-code">/ {subjectCode}</span>
      </div>
      {userType === "faculty" && (
        <button className="write-button" onClick={onWrite}>
          글쓰기
        </button>
      )}
    </div>
  );
}