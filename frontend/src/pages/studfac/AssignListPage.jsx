import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../../components/Board/BoardHeader";
import "./AssignListPage.css";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../apis/axiosInstance";

export default function AssignListPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [assignments, setAssignments] = useState([]);
  const [courseInfo, setCourseInfo] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userType = user?.user_type;
  const userId = user?.user_id;

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

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(
        `/api/lectures/${lectureId}/assignments`
      );
      let assignmentData = [];
      if (res.data.success) {
        assignmentData = res.data.data || [];
      } else {
        assignmentData = res.data || [];
      }

      if (userType === "student" && assignmentData.length > 0) {
        const assignmentsWithStatus = await Promise.all(
          assignmentData.map(async (assignment) => {
            try {
              const submissionRes = await axiosInstance.get(
                `/api/lectures/${lectureId}/assignments/${assignment.assignment_id}/submissions`
              );
              let submissionData = [];
              if (submissionRes.data.success) {
                submissionData = submissionRes.data.data || [];
              } else {
                submissionData = submissionRes.data || [];
              }
              const userSubmission = submissionData.find(
                (sub) => sub.author_id === userId
              );
              return {
                ...assignment,
                submitted: !!userSubmission,
                submission_id: userSubmission?.submission_id || null,
              };
            } catch {
              return {
                ...assignment,
                submitted: false,
                submission_id: null,
              };
            }
          })
        );
        setAssignments(assignmentsWithStatus);
      } else if (userType === "faculty" && assignmentData.length > 0) {
        const assignmentsWithStats = await Promise.all(
          assignmentData.map(async (assignment) => {
            try {
              const studentsRes = await axiosInstance.get(
                `/api/lectures/${lectureId}/students`
              );
              let studentData = [];
              if (studentsRes.data.success) {
                studentData = studentsRes.data.data || [];
              } else {
                studentData = studentsRes.data || [];
              }

              const submissionRes = await axiosInstance.get(
                `/api/lectures/${lectureId}/assignments/${assignment.assignment_id}/submissions`
              );
              let submissionData = [];
              if (submissionRes.data.success) {
                submissionData = submissionRes.data.data || [];
              } else {
                submissionData = submissionRes.data || [];
              }

              return {
                ...assignment,
                totalStudents: studentData.length,
                submittedCount: submissionData.length,
              };
            } catch {
              return {
                ...assignment,
                totalStudents: 0,
                submittedCount: 0,
              };
            }
          })
        );
        setAssignments(assignmentsWithStats);
      } else {
        setAssignments(assignmentData);
      }
    } catch {
      setError("과제 목록을 불러오는데 실패했습니다.");
      setAssignments([]);
    }
    setLoading(false);
  };

  const handleRowClick = (assignmentId, status) => {
    if (userType === "faculty") {
      navigate(`/professor/assignment/${lectureId}/${assignmentId}`);
    } else if (userType === "student") {
      if (status === "제출 완료") {
        navigate(`/assignment/${lectureId}/${assignmentId}/${userId}`);
      } else {
        navigate(`/student/assignment/${lectureId}/${assignmentId}`);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return dateString.slice(0, 10);
    }
  };

  useEffect(() => {
    if (lectureId && user) {
      fetchCourseInfo();
      fetchAssignments();
    }
  }, [lectureId, user]);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="assignment-list-container">
      <h1 className="board-title">과제 목록</h1>
      <BoardHeader
        subjectName={courseInfo.name}
        subjectCode={courseInfo.code}
        onWrite={() => navigate(`/professor/assignment/${lectureId}/write`)}
        userType={userType}
      />
      {error && (
        <div
          className="error-message"
          style={{ color: "red", margin: "20px 0" }}
        >
          {error}
        </div>
      )}
      {loading ? (
        <div className="loading-message">로딩 중...</div>
      ) : assignments.length === 0 ? (
        <div className="no-assignments-message">
          {error ? "오류가 발생했습니다." : "등록된 과제가 없습니다."}
        </div>
      ) : (
        <table className="assignment-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>제목</th>
              <th>제출 기간</th>
              {userType === "faculty" && <th>제출률</th>}
              {userType === "student" && <th>제출 상태</th>}
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, idx) => {
              const status = assignment.submitted ? "제출 완료" : "미제출";
              const submitRate =
                assignment.totalStudents && assignment.totalStudents > 0
                  ? `${(
                      (assignment.submittedCount / assignment.totalStudents) *
                      100
                    ).toFixed(1)}%`
                  : assignment.totalStudents === 0
                  ? "0%"
                  : "-";
              const now = new Date();
              const endDate = new Date(assignment.end_date);
              const isOverdue = now > endDate;

              return (
                <tr
                  key={assignment.assignment_id}
                  onClick={() =>
                    handleRowClick(assignment.assignment_id, status)
                  }
                  style={{ cursor: "pointer" }}
                  className={isOverdue ? "overdue" : ""}
                >
                  <td>{idx + 1}</td>
                  <td>
                    {assignment.title}
                    {isOverdue && userType === "student" && (
                      <span className="overdue-badge"> (마감)</span>
                    )}
                  </td>
                  <td className="date-cell">
                    {formatDate(assignment.start_date)} <br />~{" "}
                    {formatDate(assignment.end_date)}
                  </td>
                  {userType === "faculty" ? (
                    <td>{submitRate}</td>
                  ) : (
                    <td
                      className={`status-cell ${
                        status === "제출 완료" ? "submitted" : "not-submitted"
                      }`}
                    >
                      {status}
                      {isOverdue && status === "미제출" && (
                        <span className="overdue-text"> (기한 만료)</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
