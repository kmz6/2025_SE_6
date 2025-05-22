import React from "react";
//import { useParams } from "react-router-dom";
import PostHeader from "../components/Post/PostHeader";
import PostBox from "../components/Post/PostBox";
import CommentBox from "../components/Post/CommentBox";
import "./ArchivesPostPage.css";

export default function ArchivesPostPage() {
  //const { lectureId, postId } = useParams();

  const dummyComments = [
    { meta: "작성자 이름 (학과/학번)", content: "댓글 내용입니다." }
  ];

  return (
    <div className="archives-detail-container">
      <h1 className="board-title">강의 자료실</h1>

      <PostHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onEdit={() => console.log("수정")}
        onDelete={() => console.log("삭제")}
      />

      <PostBox
        title="예시 제목"
        author="홍길동"
        date="2025-05-19"
        content="여기 게시글의 본문 내용이 들어갑니다."
      />

      <CommentBox comments={dummyComments} />
    </div>
  );
}
