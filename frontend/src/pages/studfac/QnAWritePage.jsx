import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./QnAWritePage.css";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";
import PostWriteHeader from "../../components/Post/PostWriteHeader";
import { insertBoard, patchBoard } from "../../apis/board/board";
import * as ModalStyle from "../../styles/Modal.style";

export default function QnAWritePage() {
  const { lectureId, postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [initialValues, setInitialValues] = useState({ title: "", content: "" });
  const isEdit = !!postId;

  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cancelVisible, setCancelVisible] = useState(false);
  const [modalAction, setModalAction] = useState({ onConfirm: () => {}, onCancel: () => {} });

  const openModal = (message, callback) => {
    setModalMessage(message);
    setModalVisible(true);
    setCancelVisible(false);
    setModalAction({ onConfirm: () => closeModal(callback) });
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
          closeModal(() => resolve(true));
        },
        onCancel: () => {
          closeModal(() => resolve(false));
        },
      });
    });
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

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/qna/${postId}`);
      setInitialValues({
        title: response.data.title,
        content: response.data.content,
      });
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchCourseName();
    if (isEdit) {
      fetchPost();
    }
  }, [lectureId, postId]);

  const handleSubmit = async (formData, values) => {
    try {
      if (isEdit) {
        const hasFile = formData.getAll("files")?.length > 0;

        if (!hasFile) {
          const confirmKeep = await showConfirmModal(
            "첨부 파일이 업로드 되지 않았습니다.\n기존 첨부 파일을 유지하시겠습니까?"
          );
          if (!confirmKeep) return;
        }

        await patchBoard(postId, formData);
        openModal("수정 완료", () => navigate(`/qna/${lectureId}`));
      } else {
        formData.append("author_id", user.user_id);
        await insertBoard(lectureId, "qna", formData);
        openModal("등록 완료", () => navigate(`/qna/${lectureId}`));
      }
    } catch (error) {
      console.error("전송 실패:", error);
      openModal(isEdit ? "수정 중 오류 발생" : "등록 중 오류 발생");
    }
  };

  return (
    <div className="qna-write-container">
      <h1 className="board-title">{isEdit ? "Q&A 수정" : "Q&A 작성"}</h1>
      <PostWriteHeader subjectName={courseName} subjectCode={courseCode} />

      <PostWriteForm onSubmit={handleSubmit} initialValues={initialValues} />

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
                <ModalStyle.ModalCloseButton onClick={modalAction.onConfirm}>확인</ModalStyle.ModalCloseButton>
              </div>
            )}
          </ModalStyle.Modal>
        </ModalStyle.ModalOverlay>
      )}
    </div>
  );
}
