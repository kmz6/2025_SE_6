import React from "react";
import "./PostWriteHeader.css";

export default function PostWriteHeader({ subjectName, subjectCode}) {

  return (
    <div className="write-header">
      <div className="subject-info">
        <span className="subject-name">{subjectName}</span>
        <span className="subject-code">/ {subjectCode}</span>
      </div>
    </div>
  );
}