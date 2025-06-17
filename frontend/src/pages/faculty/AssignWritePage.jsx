import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../../components/Board/BoardHeader";
import PostWriteForm from "../../components/Post/PostWriteForm";
import "./AssignWritePage.css";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";
import * as ModalStyle from "../../styles/Modal.style";

export default function AssignWritePage() {
  const { lectureId, postId } = useParams();
  const isEdit = Boolean(postId);
  const navigate = useNavigate();
  const { user } = useUser();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(true);

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

  const fetchCourseInfo = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/assignments/${postId}`);
      const data = res.data.data;
      setInitialValues({
        title: data.title ?? "",
        content: data.content ?? "",
        start_date: new Date(data.start_date).toLocaleDateString("sv-SE") ?? "",
        end_date: new Date(data.end_date).toLocaleDateString("sv-SE") ?? "",
      });
    } catch (error) {
      console.error("기존 과제 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchCourseInfo();
      if (isEdit) {
        await fetchAssignment();
      }
      setLoading(false);
    };
    load();
  }, [lectureId, postId]);

  if (loading) return <div>로딩 중...</div>;

  const handleSubmit = async (formData, values) => {
    const { start_date, end_date } = values;

    if (!start_date) {
      openModal("과제 제출 시작일을 입력해주세요.");
      return;
    }
    if (!end_date) {
      openModal("과제 제출 마감일을 입력해주세요.");
      return;
    }

    const startDate = new Date(start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end_date);
    endDate.setHours(0, 0, 0, 0);

    if (endDate < startDate) {
      openModal("마감일은 시작일보다 이전일 수 없습니다.");
      return;
    }

    const startDateStr = startDate.toLocaleDateString("sv-SE");
    const endDateStr = endDate.toLocaleDateString("sv-SE");

    formData.set("start_date", startDateStr);
    formData.set("end_date", endDateStr);
    formData.append("author_id", user.user_id);

    try {
      if (isEdit) {
        const hasFile = formData.getAll("files")?.length > 0;

        if (!hasFile) {
          const confirmKeep = await showConfirmModal(
            "첨부 파일이 업로드 되지 않았습니다.\n기존 첨부 파일을 유지하시겠습니까?"
          );
          if (!confirmKeep) {
            return;
          }
        }

        await axiosInstance.put(
          `/api/lectures/${lectureId}/assignments/${postId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        openModal("과제가 수정되었습니다.", () => navigate(`/assignment/${lectureId}`));
      } else {
        await axiosInstance.post(`/api/lectures/${lectureId}/assignments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        openModal("과제가 등록되었습니다.", () => navigate(`/assignment/${lectureId}`));
      }
    } catch (error) {
      console.error("과제 등록/수정 실패:", error);
      openModal("과제 처리 중 오류 발생");
    }
  };

  return (
    <div className="assign-write-container">
      <h1 className="board-title">{isEdit ? "과제 수정" : "과제 등록"}</h1>

      <BoardHeader subjectName={courseName} subjectCode={courseCode} />

      <div className="date-inputs">
        <label>
          제출 시작일:
          <input
            type="date"
            value={initialValues.start_date ?? ""}
            onChange={(e) =>
              setInitialValues({ ...initialValues, start_date: e.target.value })
            }
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          제출 마감일:
          <input
            type="date"
            value={initialValues.end_date ?? ""}
            onChange={(e) =>
              setInitialValues({ ...initialValues, end_date: e.target.value })
            }
          />
        </label>
      </div>

      <PostWriteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "수정" : "등록"}
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
