import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";
import * as ModalStyle from "../../styles/Modal.style";
import "./AssignSubmitListPage.css";

export default function AssignSubmitListPage() {
  const { lectureId, postId } = useParams();
  const assignmentId = postId;
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;
  const [courseInfo, setCourseInfo] = useState({ name: "", code: "" });

  const [assignment, setAssignment] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      if (res.data.success) {
        setCourseInfo({
          name: res.data.data.course_name || res.data.course_name,
          code: res.data.data.course_code || res.data.course_code,
        });
      } else {
        setCourseInfo({
          name: res.data.course_name,
          code: res.data.course_code,
        });
      }
    } catch (error) {
      console.log(error);
      setError("과목 정보를 불러오는데 실패했습니다.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateStr.slice(0, 10);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr.slice(0, 16).replace("T", " ");
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/assignments/${assignmentId}`);
      const assignmentData = res.data.success ? res.data.data : res.data;
      setAssignment(assignmentData);
    } catch {
      setError("과제 정보를 불러오는데 실패했습니다.");
    }
  };

  const fetchAssignmentAttachments = async () => {
    try {
      const res = await axiosInstance.get(`/api/assignments/${postId}/attachments`);
      if (res.data.success) {
        setAttachments(res.data.data);
      }
    } catch (err) {
      console.log("첨부파일 정보 불러오기 실패:", err);
    }
  };

  const fetchSubmittedAssignments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`
      );
      const submissionData = res.data.success ? res.data.data : res.data;
      setSubmittedAssignments(submissionData || []);
    } catch (error) {
      if (error.response?.status === 404) {
        setSubmittedAssignments([]);
      } else {
        setError("제출 현황을 불러오는데 실패했습니다.");
        setSubmittedAssignments([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (lectureId && assignmentId && user) {
      fetchCourseInfo();
      fetchAssignment();
      fetchAssignmentAttachments();
      fetchSubmittedAssignments();
    }
  }, [lectureId, assignmentId, user]);

  const handleEditAssignment = () => {
    navigate(`/professor/assignment/${lectureId}/edit/${assignmentId}`);
  };

  const handleDeleteAssignment = async () => {
    const confirmDelete = await showConfirmModal(
      "출제된 과제를 정말 삭제하시겠습니까?\n관련된 모든 제출물과 첨부파일도 함께 삭제됩니다."
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(
        `/api/lectures/${lectureId}/assignments/${assignmentId}`
      );
      if (res.data.success || res.status === 200) {
        openModal("과제가 성공적으로 삭제되었습니다.", () =>
          navigate(`/assignment/${lectureId}`)
        );
      } else {
        throw new Error(res.data.message || "삭제 실패");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        openModal("이미 삭제된 과제이거나 존재하지 않는 과제입니다.");
      } else {
        openModal(
          `과제 삭제 중 오류가 발생했습니다: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  if (!user) {
    return <div className="error-message">로그인이 필요합니다.</div>;
  }

  if (error && !assignment) {
    return (
      <div className="error-container">
        <h1 className="board-title">제출된 과제 목록</h1>
        <div className="error-message">{error}</div>
        <button onClick={() => navigate(`/assignment/${lectureId}`)}>
          과제 목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (!assignment) {
    return <div className="loading-message">과제 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="assign-submit-list-container">
      <h1 className="board-title">제출된 과제 목록</h1>

      <PostHeader
        subjectName={courseInfo.name}
        subjectCode={courseInfo.code}
        authorId={assignment.author_id}
        currentUserId={currentUserId}
        onEdit={handleEditAssignment}
        onDelete={handleDeleteAssignment}
      />

      <PostBox
        title={assignment.title}
        author={assignment.name || "교수명"}
        date={`제출 기간: ${formatDate(assignment.start_date)} ~ ${formatDate(
          assignment.end_date
        )}`}
        content={assignment.content}
        attachment={attachments}
      />

      {error && (
        <div className="error-message" style={{ color: "red", margin: "20px 0" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-message">제출 현황을 불러오는 중...</div>
      ) : submittedAssignments.length === 0 ? (
        <div className="no-submissions-message">
          {error ? "제출 현황을 불러올 수 없습니다." : "아직 제출된 과제가 없습니다."}
        </div>
      ) : (
        <table className="submit-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>학번</th>
              <th>이름</th>
              <th>제출일시</th>
              <th>제출상태</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((submission, idx) => {
              const studentId = submission.author_id;
              const studentName = submission.student_name || "-";
              const status = submission.status || "제출 완료";

              return (
                <tr
                  key={`${submission.submission_id}-${studentId}`}
                  onClick={() =>
                    navigate(`/assignment/${lectureId}/${assignmentId}/${studentId}`)
                  }
                  style={{ cursor: "pointer" }}
                  className="submission-row"
                >
                  <td>{idx + 1}</td>
                  <td>{studentId}</td>
                  <td>{studentName}</td>
                  <td>{formatDateTime(submission.created_at)}</td>
                  <td className={`status-cell ${status === "제출 완료" ? "submitted" : "not-submitted"}`}>
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

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
