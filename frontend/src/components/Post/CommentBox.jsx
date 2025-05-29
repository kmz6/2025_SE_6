import React, { useState } from "react";
import "./CommentBox.css";
export default function CommentBox({ comments, onAddComment, onEditComment, onDeleteComment }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        meta: "홍길동 (컴퓨터공학/2022202020)",
        content: newComment,
      };
      onAddComment(newCommentObj);
      setNewComment("");
    }
  };

  const isMine = (meta) => meta.includes("홍길동");  // 로그인 사용자 기준으로 조건 판단

  return (
    <div className="comment-box">
      <div className="comment-title">댓글</div>

      <form className="comment-form" onSubmit={handleAddComment}>
        <textarea
          className="comment-input"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit" className="comment-submit-btn">
          등록
        </button>
      </form>

      <div className="comment-list">
        {comments.map((comment, idx) => (
          <div key={idx} className="comment-item">
            <div className="comment-meta">
              {comment.meta}
              {isMine(comment.meta) && (
                <div className="comment-actions">
                  <button onClick={() => onEditComment(idx)} className="action-btn">수정</button>
                  <button onClick={() => onDeleteComment(idx)} className="action-btn">삭제</button>
                </div>
              )}
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
