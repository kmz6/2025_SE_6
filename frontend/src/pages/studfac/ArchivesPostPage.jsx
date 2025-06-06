import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import "./ArchivesPostPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";
import { deleteBoard } from "../../apis/board/board";

export default function ArchivesPostPage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [post, setPost] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  // 게시글
  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/materials/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("자료실 상세 조회 실패:", error);
    }
  };

  // 과목명
  const fetchCourseName = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCourseName();
  }, [lectureId, postId]);

  const handleEdit = () => {
    if (!lectureId || !postId) {
      console.error("잘못된 수정 요청: lectureId 또는 postId 없음");
      return;
    }
    navigate(`/professor/archives/${lectureId}/edit/${postId}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteBoard(postId);
      alert("삭제되었습니다.");
      navigate(`/archives/${lectureId}`);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="archives-detail-container">
      <h1 className="board-title">강의 자료실</h1>

      <PostHeader
        subjectName={courseName}
        subjectCode={courseCode}
        onEdit={handleEdit}
        onDelete={handleDelete}
        authorId={post.author_id}
        currentUserId={currentUserId}
      />

      <PostBox
        title={post.title}
        author={post.name}
        date={post.created_at?.slice(0, 10)}
        content={post.content}
      />
    </div>
  );
}
