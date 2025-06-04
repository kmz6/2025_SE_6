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
  const userType = user?.user_type;
  const studentId = user?.user_id;

  const [assignments, setAssignments] = useState([]);
  const [submissionStatuses, setSubmissionStatuses] = useState({});
  const [courseInfo, setCourseInfo] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);

  const fetchCourseInfo = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseInfo({
        name: res.data.course_name,
        code: res.data.course_code,
      });
    } catch (error) {
      console.error("과목 정보 로딩 실패:", error);
    }
  };

  const fetchSubmissionStatuses = async (assignmentList) => {
    if (userType !== "student" || !studentId) return;

    const newStatuses = {};
    await Promise.all(
      assignmentList.map(async (assignment) => {
        try {
          const res = await axiosInstance.get(
            `/api/lectures/${lectureId}/assignments/${assignment.assignment_id}/status`,
            { params: { user_id: studentId } }
          );
          newStatuses[assignment.assignment_id] = res.data.status || "미제출";
        } catch (err) {
          newStatuses[assignment.assignment_id] = "미제출";
          console.log(err)
        }
      })
    );
    setSubmissionStatuses(newStatuses);
  };

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/lectures/${lectureId}/assignments`);
      const assignmentList = res.data || [];
      setAssignments(assignmentList);
      await fetchSubmissionStatuses(assignmentList);
    } catch (error) {
      console.error("과제 불러오기 실패:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (lectureId) {
      fetchCourseInfo();
      fetchAssignments();
    }
  }, [lectureId]);

  const handleRowClick = (assignmentId, status) => {
    if (userType === "faculty") {
      navigate(`/professor/assignment/${lectureId}/${assignmentId}`);
    } else if (userType === "student") {
      if (status === "제출 완료") {
        navigate(`/assignment/${lectureId}/${assignmentId}/${studentId}`);
      } else {
        navigate(`/student/assignment/${lectureId}/${assignmentId}`);
      }
    }
  };

  return (
    <div className="assignment-list-container">
      <h1 className="board-title">과제 목록</h1>

      <BoardHeader
        subjectName={courseInfo.name}
        subjectCode={courseInfo.code}
        onWrite={() => navigate(`/professor/assignment/${lectureId}/write`)}
        userType={userType}
      />

      {loading ? (
        <p>로딩 중...</p>
      ) : assignments.length === 0 ? (
        <p>등록된 과제가 없습니다.</p>
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
            {assignments.map((a, idx) => {
              const status = submissionStatuses[a.assignment_id] || "미제출";
              const submitRate = a.totalStudents
                ? `${((a.submittedCount / a.totalStudents) * 100).toFixed(1)}%`
                : "-";

              return (
                <tr
                  key={a.assignment_id}
                  onClick={() => handleRowClick(a.assignment_id, status)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{idx + 1}</td>
                  <td>{a.title}</td>
                  <td className="date-cell">
                    {a.start_date?.slice(0, 10) || "-"} <br />~ {a.end_date?.slice(0, 10) || "-"}
                  </td>
                  {userType === "faculty" ? (
                    <td>{submitRate}</td>
                  ) : (
                    <td className={status === "제출 완료" ? "submitted" : "not-submitted"}>
                      {status}
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
