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
      const response = await axiosInstance.get(
        `/api/lectures/${lectureId}/qna/${postId}`
      );
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

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/lectures/${lectureId}/qna/${postId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCourseName();
    fetchComments();
  }, [lectureId, postId]);

  const handleAddComment = async (newComment) => {
    try {
      await axiosInstance.post(
        `/api/lectures/${lectureId}/qna/${postId}/comments`,
        {
          author_id: currentUserId,
          content: newComment.content,
        }
      );
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditComment = async (commentId, newContent) => {
  try {
    await axiosInstance.put(
      `/api/lectures/${lectureId}/qna/${postId}/comments/${commentId}`,
      { content: newContent }
    );
    fetchComments();
  } catch (error) {
    console.error("댓글 수정 실패:", error);
    alert("댓글 수정에 실패했습니다.");
  }
};

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(
        `/api/lectures/${lectureId}/qna/${postId}/comments/${commentId}`
      );
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
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
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        currentUserId={currentUserId}
      />
    </div>
  );
}
