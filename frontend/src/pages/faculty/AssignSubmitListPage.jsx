import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import axiosInstance from "../../apis/axiosInstance";
import { useUser } from "../../context/UserContext";
import "./AssignSubmitListPage.css";

export default function AssignSubmitListPage() {
  const { lectureId, postId } = useParams();
  const assignmentId = postId;
  const navigate = useNavigate();
  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [assignment, setAssignment] = useState(null);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toISOString().slice(0, 10);
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
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${assignmentId}`
      );
      const assignmentData = res.data.success ? res.data.data : res.data;
      setAssignment(assignmentData);
    } catch {
      setError("과제 정보를 불러오는데 실패했습니다.");
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
      fetchAssignment();
      fetchSubmittedAssignments();
    }
  }, [lectureId, assignmentId, user]);

  const handleEditAssignment = () => {
    navigate(`/professor/assignment/${lectureId}/edit/${assignmentId}`);
  };

  const handleDeleteAssignment = async () => {
    const confirmDelete = window.confirm(
      "출제된 과제를 정말 삭제하시겠습니까?\n관련된 모든 제출물과 첨부파일도 함께 삭제됩니다."
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(
        `/api/lectures/${lectureId}/assignments/${assignmentId}`
      );
      if (res.data.success || res.status === 200) {
        alert("과제가 성공적으로 삭제되었습니다.");
        navigate(`/assignment/${lectureId}`);
      } else {
        throw new Error(res.data.message || "삭제 실패");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("이미 삭제된 과제이거나 존재하지 않는 과제입니다.");
      } else {
        alert(`과제 삭제 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
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
        subjectName={assignment.title}
        subjectCode={`${formatDate(assignment.start_date)} ~ ${formatDate(assignment.end_date)}`}
        authorId={assignment.author_id}
        currentUserId={currentUserId}
        onEdit={handleEditAssignment}
        onDelete={handleDeleteAssignment}
      />

      <PostBox
        title={assignment.title}
        author={assignment.author_id || "교수명"}
        date={`제출 기간: ${formatDate(assignment.start_date)} ~ ${formatDate(assignment.end_date)}`}
        content={assignment.content}
        attachment={null}
      />

      <div className="submission-summary">
        <h3>제출 현황</h3>
        <p>총 제출 건수: {submittedAssignments.length}건</p>
      </div>

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
              <th>제출 제목</th>
              <th>제출일시</th>
              <th>제출상태</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((submission, idx) => {
              const studentId = submission.author_id;
              const studentName = submission.student_name || "-";
              const submissionTitle = submission.title || "-";
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
                  <td className="submission-title">{submissionTitle}</td>
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

      <div className="action-buttons">
        <button
          onClick={() => navigate(`/assignment/${lectureId}`)}
          className="back-button"
        >
          과제 목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
