import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../../components/Post/PostHeader";
import PostBox from "../../components/Post/PostBox";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";
import "./AssignSubmittedDetailPage.css";

export default function AssignSubmittedDetailPage() {
  const { lectureId, postId, studentId } = useParams();
  const assignmentId = postId;
  const navigate = useNavigate();

  const { user } = useUser();
  const currentUserId = user?.user_id;

  const [courseInfo, setCourseInfo] = useState({ name: "", code: "" });
  const [assignment, setAssignment] = useState(null);
  const [assignmentAttachments, setAssignmentAttachments] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const courseRes = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseInfo({
        name: courseRes.data.course_name,
        code: courseRes.data.course_code,
      });

      const assignmentRes = await axiosInstance.get(`/api/lectures/${lectureId}/assignments/${assignmentId}`);
      if (assignmentRes.data.success) {
        setAssignment(assignmentRes.data.data);
      } else {
        throw new Error(assignmentRes.data.message || "과제 정보를 불러올 수 없습니다.");
      }

      try {
        const attachmentsRes = await axiosInstance.get(`/api/assignments/${assignmentId}/attachments`);
        if (attachmentsRes.data.success) {
          setAssignmentAttachments(attachmentsRes.data.data || []);
        } else {
          setAssignmentAttachments([]);
        }
      } catch {
        setAssignmentAttachments([]);
      }

      try {
        const submissionRes = await axiosInstance.get(`/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`);
        if (submissionRes.data.success) {
          const studentSubmission = submissionRes.data.data.find(sub => sub.author_id === studentId);
          setSubmission(studentSubmission || null);
        } else {
          setSubmission(null);
        }
      } catch {
        setSubmission(null);
      }
    } catch (err) {
      if (err.message.includes("과제 정보") || err.config?.url?.includes("/info")) {
        setError(err.response?.data?.message || "필수 데이터를 불러오는 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/assignment/${lectureId}/edit/${assignmentId}/${studentId}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 이 과제를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await axiosInstance.delete(`/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`, { data: { author_id: studentId } });
      if (response.data.success) {
        alert("제출물이 성공적으로 삭제되었습니다.");
        navigate(`/assignment/${lectureId}`);
      } else {
        throw new Error(response.data.message || "삭제에 실패했습니다.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "삭제 중 문제가 발생했습니다.";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    fetchAllData();
  }, [lectureId, assignmentId, studentId]);

  if (loading) {
    return (
      <div className="assign-submitted-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assign-submitted-detail-container">
        <div className="error-message">
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      </div>
    );
  }

  return (
    <div className="assign-submitted-detail-container">
      <h1 className="board-title">제출된 과제 상세</h1>

      <PostHeader
        subjectName={courseInfo.name}
        subjectCode={courseInfo.code}
        authorId={submission?.author_id}
        currentUserId={currentUserId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {assignment && (
        <>
          <h2 className="box-title">출제된 과제</h2>
          <PostBox
            title={assignment.title}
            author={assignment.author_id}
            date={`${formatDate(assignment.start_date)} ~ ${formatDate(assignment.end_date)}`}
            content={assignment.content}
            attachment={assignmentAttachments.length > 0 ? {
              name: assignmentAttachments[0].file_name,
              url: assignmentAttachments[0].file_path,
            } : null}
          />

          {assignmentAttachments.length > 1 && (
            <div className="additional-attachments">
              <h4>추가 첨부파일</h4>
              <ul>
                {assignmentAttachments.slice(1).map((att) => (
                  <li key={att.file_id}>
                    <a href={att.file_path} target="_blank" rel="noopener noreferrer" className="attachment-link">
                      {att.file_name}
                    </a>
                    <span className="attachment-date">(업로드: {formatDateTime(att.created_at)})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {submission ? (
        <>
          <h2 className="box-title">학생 제출 과제</h2>
          <PostBox
            title={submission.title}
            author={submission.student_name || submission.author_id}
            date={formatDateTime(submission.created_at)}
            content={submission.content}
            attachment={null}
          />

          <div className="submission-info">
            <div className="submission-status">
              <span className="status-label">제출 상태:</span>
              <span className="status-value success">제출 완료</span>
            </div>
            <div className="submission-date">
              <span className="date-label">제출일시:</span>
              <span className="date-value">{formatDateTime(submission.created_at)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="no-submission">
          <h2 className="box-title">학생 제출 과제</h2>
          <div className="no-submission-message">
            <p>아직 제출된 과제가 없습니다.</p>
            <p className="submission-deadline">제출 마감: {formatDateTime(assignment?.end_date)}</p>
          </div>
        </div>
      )}

      {assignment && (
        <div className="assignment-deadline-info">
          {new Date() > new Date(assignment.end_date) ? (
            <div className="deadline-passed">
              <span>제출 마감일이 지났습니다</span>
            </div>
          ) : (
            <div className="deadline-active">
              <span>제출 마감: {formatDateTime(assignment.end_date)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}