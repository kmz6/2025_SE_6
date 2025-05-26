// components/Post/CommentBox.jsx
import React from "react";
import "./CommentBox.css";

export default function CommentBox({ comments }) {
  return (
    <div className="comment-box">
      <div className="comment-title">댓글</div>
      {comments.map((comment, idx) => (
        <div key={idx} className="comment-item">
          <div className="comment-meta">
            {comment.meta}
            <span className="comment-actions">수정 / 삭제</span>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
}
