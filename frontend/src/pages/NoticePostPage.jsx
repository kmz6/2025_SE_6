import React from "react";
//import { useParams } from "react-router-dom";
import "./NoticePostPage.css";

export default function NoticePostPage() {
  //const { id } = useParams();

  return (
    <div className="notice-post-container">
      <div className="notice-header">
        <div className="subject-info">
          <span className="subject-name">과목명</span>
          <span className="subject-code">/학정번호</span>
        </div>
        <div className="button-group">
          <button className="edit-button">수정</button>
          <button className="delete-button">삭제</button>
        </div>
      </div>

      <div className="post-box">
        <div className="post-title">게시물 제목</div>
        <div className="post-meta">
          <span>작성자</span>
          <span>작성일자</span>
        </div>
        <div className="post-content">
          본문 내용
        </div>
      </div>

      <div className="comment-box">
        <div className="comment-title">댓글</div>
        <div className="comment-item">
          <div className="comment-meta">작성자 이름 (학번)
            <span className="comment-actions">수정 / 삭제</span>
          </div>
          <div className="comment-content">
            댓글 내용
          </div>
        </div>
        <div className="comment-item">
          <div className="comment-meta">작성자 이름 (학번)
            <span className="comment-actions">수정 / 삭제</span>
          </div>
          <div className="comment-content">
            댓글 내용
          </div>
        </div>
      </div>
    </div>
  );
}