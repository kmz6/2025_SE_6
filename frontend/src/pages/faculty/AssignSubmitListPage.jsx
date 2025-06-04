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
  const [studentList, setStudentList] = useState([]);
  const [submissionStatuses, setSubmissionStatuses] = useState({});
  const [submissionDates, setSubmissionDates] = useState({});

  // 날짜 포맷 유틸
  const formatDate = (dateStr) => {
    return dateStr?.slice(0, 10) || "-";
  };

  const fetchAssignment = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${assignmentId}`
      );
      setAssignment(res.data);
    } catch (error) {
      console.error("과제 조회 실패:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/students`
      );
      setStudentList(res.data);
    } catch (error) {
      console.error("학생 목록 조회 실패:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments/${assignmentId}/submissions`
      );
      const statuses = {};
      const dates = {};

      res.data.forEach((submission) => {
        const { author_id, created_at } = submission;
        statuses[author_id] = created_at ? "제출" : "미제출";
        if (created_at) {
          dates[author_id] = formatDate(created_at);
        }
      });

      setSubmissionStatuses(statuses);
      setSubmissionDates(dates);
    } catch (error) {
      console.error("제출 상태 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (lectureId && assignmentId) {
      fetchAssignment();
      fetchStudents();
      fetchSubmissions();
    }
  }, [lectureId, assignmentId]);

  const handleEditAssignment = () => {
    navigate(`/assignment/edit/${lectureId}/${assignmentId}`);
  };

  const handleDeleteAssignment = async () => {
    const confirmDelete = window.confirm("출제된 과제를 정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/api/lectures/${lectureId}/assignments/${assignmentId}`
      );
      alert("과제 삭제 완료");
      navigate(`/assignment/${lectureId}`);
    } catch (error) {
      console.error("과제 삭제 실패:", error);
      alert("과제 삭제 중 오류가 발생했습니다.");
    }
  };

  if (!assignment) return <div className="loading-message">과제 정보를 불러오는 중입니다...</div>;

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
        date={`${formatDate(assignment.start_date)} ~ ${formatDate(assignment.end_date)}`}
        content={assignment.content}
        attachment={null}
      />

      <table className="submit-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>학번</th>
            <th>이름</th>
            <th>제출일</th>
            <th>제출상태</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, idx) => {
            const studentId = student.student_id;
            const isSubmitted = submissionStatuses[studentId] === "제출";

            return (
              <tr
                key={studentId}
                className={isSubmitted ? "clickable" : ""}
                onClick={() =>
                  isSubmitted &&
                  navigate(`/assignment/${lectureId}/${assignmentId}/${studentId}`)
                }
              >
                <td>{idx + 1}</td>
                <td>{studentId}</td>
                <td>{student.name}</td>
                <td>{submissionDates[studentId] || "-"}</td>
                <td className={isSubmitted ? "submitted" : "not-submitted"}>
                  {isSubmitted ? "제출" : "미제출"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
