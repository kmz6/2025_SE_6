import React, { useState } from "react";
import "./CommentBox.css";

export default function CommentBox({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  currentUserId,
}) {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({ content: newComment });
      setNewComment("");
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment.comment_id);
    setEditingContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEditing = () => {
    if (editingContent.trim()) {
      onEditComment(editingId, editingContent);
      setEditingId(null);
      setEditingContent("");
    }
  };

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
        {comments.map((comment) => {
          const isMine = comment.author_id === currentUserId;
          const isEditing = editingId === comment.comment_id;

          return (
            <div key={comment.comment_id} className="comment-item">
              <div className="comment-meta">
                <div className="meta-left">
                  <strong>{comment.author_name}</strong>
                  {isMine && (
                    <div className="comment-actions">
                      {!isEditing ? (
                        <>
                          <button
                            className="action-btn"
                            onClick={() => startEditing(comment)}
                          >
                            수정
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => onDeleteComment(comment.comment_id)}
                          >
                            삭제
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="action-btn"
                            onClick={saveEditing}
                          >
                            저장
                          </button>
                          <button
                            className="action-btn"
                            onClick={cancelEditing}
                          >
                            취소
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="meta-right">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
              <div className="comment-content">
                {isEditing ? (
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    rows={3}
                    style={{ width: "100%" }}
                  />
                ) : (
                  comment.content
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
