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
      const [courseRes, assignmentRes, attachmentsRes, submissionRes] = await Promise.all([
        axiosInstance.get(`/api/lectures/${lectureId}/info`),
        axiosInstance.get(`/api/lectures/${lectureId}/assignments/${assignmentId}`),
        axiosInstance.get(`/api/assignments/${assignmentId}/attachments`),
        axiosInstance.get(`/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`, {
          params: { author_id: studentId }
        })
      ]);

      setCourseInfo({
        name: courseRes.data.course_name,
        code: courseRes.data.course_code,
      });
      setAssignment(assignmentRes.data);
      setAssignmentAttachments(attachmentsRes.data || []);
      setSubmission(submissionRes.data?.[0] || null);
    } catch (err) {
      console.error("데이터 로딩 중 오류:", err);
      setError("데이터를 불러오는 중 문제가 발생했습니다.");
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
      await axiosInstance.delete(
        `/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`,
        { data: { author_id: studentId } }
      );
      navigate(`/assignments/${lectureId}`);
    } catch (err) {
      console.error("삭제 실패:", err);
      setError("삭제 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [lectureId, assignmentId, studentId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

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
            date={`${assignment.start_date?.slice(0, 10)} ~ ${assignment.end_date?.slice(0, 10)}`}
            content={assignment.content}
            attachment={assignmentAttachments[0] && {
              name: assignmentAttachments[0].file_name,
              url: assignmentAttachments[0].file_path,
            }}
          />

          {assignmentAttachments.length > 1 && (
            <div>
              <h4>추가 첨부파일</h4>
              <ul>
                {assignmentAttachments.slice(1).map((att) => (
                  <li key={att.file_id}>
                    <a href={att.file_path} target="_blank" rel="noopener noreferrer">{att.file_name}</a>
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
            author={submission.author_id}
            date={submission.created_at?.slice(0, 10)}
            content={submission.content}
            attachment={submission.attachments?.[0] || null}
          />

          {submission.attachments?.length > 1 && (
            <div>
              <h4>추가 제출 첨부파일</h4>
              <ul>
                {submission.attachments.slice(1).map((att, idx) => (
                  <li key={idx}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer">{att.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>아직 제출된 과제가 없습니다.</p>
      )}
    </div>
  );
}
