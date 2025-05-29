import React, { useState } from "react";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import CommentBox from "../../components/Post/CommentBox";
import "./QnAPostPage.css";
import { useUser } from "../../context/UserContext";

export default function QnAPostPage() {
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [comments, setComments] = useState([
    { meta: "홍길동 (컴퓨터공학/2022202020)", content: "댓글 내용입니다." },
  ]);

  const postAuthorId = "2022000000";  // 예시: 게시글 작성자의 학번 또는 ID

  // 댓글 추가 함수
  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="qna-detail-container">
      <h1 className="board-title">Q&A 게시판</h1>

      <PostHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onEdit={() => console.log("수정")}
        onDelete={() => console.log("삭제")}
        authorId={postAuthorId}
        currentUserId={currentUserId}
      />

      <PostBox
        title="예시 제목"
        author="홍길동"
        date="2025-05-19"
        content="여기 게시글의 본문 내용이 들어갑니다."
      />

      {/* 댓글 추가 및 댓글 목록 출력 */}
      <CommentBox comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}
