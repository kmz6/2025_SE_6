import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import "./ArchivesPostPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";
import { getAttachment, deleteBoard } from "../../apis/board/board";
import * as ModalStyle from "../../styles/Modal.style";

export default function ArchivesPostPage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [post, setPost] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [files, setFiles] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cancelVisible, setCancelVisible] = useState(false);
  const [modalAction, setModalAction] = useState({ onConfirm: () => {}, onCancel: () => {} });

  const openModal = (message, callback) => {
    setModalMessage(message);
    setModalVisible(true);
    setCancelVisible(false);
    setModalAction({
      onConfirm: () => closeModal(callback),
    });
  };

  const closeModal = (callback) => {
    setModalVisible(false);
    setCancelVisible(false);
    if (callback) callback();
  };

  const showConfirmModal = (message) => {
    return new Promise((resolve) => {
      setModalMessage(message);
      setModalVisible(true);
      setCancelVisible(true);
      setModalAction({
        onConfirm: () => {
          closeModal();
          resolve(true);
        },
        onCancel: () => {
          closeModal();
          resolve(false);
        },
      });
    });
  };

  // 게시글
  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/materials/${postId}`);
      setPost(response.data);

      const fileData = await getAttachment(postId);
      setFiles(fileData);
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
    const confirmed = await showConfirmModal("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteBoard(postId);
      openModal("삭제되었습니다.", () => navigate(`/archives/${lectureId}`));
    } catch (error) {
      console.error("삭제 실패:", error);
      openModal("삭제 중 오류가 발생했습니다.");
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
        attachment={files}
      />

      {modalVisible && (
        <ModalStyle.ModalOverlay>
          <ModalStyle.Modal>
            <p>{modalMessage}</p>
            {cancelVisible ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ModalStyle.ModalButtonWrapper>
                  <ModalStyle.ModalCloseButton onClick={modalAction.onConfirm}>확인</ModalStyle.ModalCloseButton>
                  <ModalStyle.ModalCloseButton onClick={modalAction.onCancel}>취소</ModalStyle.ModalCloseButton>
                </ModalStyle.ModalButtonWrapper>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ModalStyle.ModalCloseButton onClick={modalAction.onConfirm}>
                  확인
                </ModalStyle.ModalCloseButton>
              </div>
            )}
          </ModalStyle.Modal>
        </ModalStyle.ModalOverlay>
      )}
    </div>
  );
}
