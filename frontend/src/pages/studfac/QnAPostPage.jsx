import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import CommentBox from "../../components/Post/CommentBox";
import "./QnAPostPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";

export default function QnAPostPage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [post, setPost] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/qna/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("QnA 상세 조회 실패:", error);
    }
  };

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

  const handleAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleEdit = () => {
    if (!lectureId || !postId) {
      console.error("잘못된 수정 요청: lectureId 또는 postId 없음");
      return;
    }
    navigate(`/qna/${lectureId}/edit/${postId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axiosInstance.delete(`/api/lectures/${lectureId}/qna/${postId}`);
      alert("삭제되었습니다.");
      navigate(`/qna/${lectureId}`);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="qna-detail-container">
      <h1 className="board-title">Q&A 게시판</h1>

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
        author={post.author_id}
        date={post.created_at?.slice(0, 10)}
        content={post.content}
      />

      <CommentBox
        comments={comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
