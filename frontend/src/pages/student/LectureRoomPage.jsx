import React, { useEffect, useState } from "react";
import "./LectureRoomPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMyLectures } from "../../hooks/useMyLectures";
import { useLectureDetail } from "../../hooks/useLectureDetail";
import { useUser } from "../../context/UserContext";
import { FaBullhorn, FaQuestionCircle } from "react-icons/fa";
import axiosInstance from "../../apis/axiosInstance";

export default function LectureRoomPage() {
  const navigate = useNavigate();
  const { lectureId: paramLectureId } = useParams();
  const { user } = useUser();
  const [archives, setArchives] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const role = user?.user_type === "faculty" ? "faculty" : "student";
  const userId = user?.user_id;

  const { data: allLectures = [], isLoading } = useMyLectures(userId, role);

  const lectures = allLectures.filter(
    (lec) => lec.course_year === 2025 && lec.course_semester === 1
  );
  const [selectedLectureId, setSelectedLectureId] = useState(paramLectureId);

  const fetchArchives = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${selectedLectureId}/materials`);
      setArchives(res.data || []);
    } catch (error) {
      console.error("자료실 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axiosInstance.get(`/api/lectures/${selectedLectureId}/assignments`);
      const assignmentData = res.data.success ? res.data.data || [] : [];

      if (role === "student") {
        const result = [];
        for (const assignment of assignmentData) {
          try {
            const subRes = await axiosInstance.get(
              `/api/lectures/${selectedLectureId}/assignments/${assignment.assignment_id}/submissions`
            );
            const submissions = subRes.data.success ? subRes.data.data || [] : [];
            const userSubmission = submissions.find((s) => s.author_id === userId);
            result.push({
              ...assignment,
              submitted: !!userSubmission,
            });
          } catch {
            result.push({
              ...assignment,
              submitted: false,
            });
          }
        }
        setAssignments(result);
      } else {
        setAssignments(assignmentData); // 교수는 제출 상태 필요 없음
      }
    } catch (e) {
      console.error("과제 불러오기 실패:", e);
      setAssignments([]);
    }
  };

  useEffect(() => {
    if (selectedLectureId) {
      fetchArchives();
      fetchAssignments();
    }
  }, [selectedLectureId]);

  useEffect(() => {
    if (!isLoading && lectures.length === 0) {
      setSelectedLectureId(null);
      return;
    }

    const validIds = lectures.map((lec) => String(lec.course_id));
    if ((!paramLectureId || !validIds.includes(paramLectureId)) && lectures.length > 0) {
      const firstId = String(lectures[0].course_id);
      setSelectedLectureId(firstId);
      navigate(`/lectureroom/${firstId}`, { replace: true });
    } else {
      setSelectedLectureId(paramLectureId);
    }
  }, [paramLectureId, lectures, isLoading, navigate]);

  const { data: course } = useLectureDetail(selectedLectureId);

  const handleChange = (e) => {
    const newId = e.target.value;
    setSelectedLectureId(newId);
    navigate(`/lectureroom/${newId}`);
  };

  if (isLoading) return <div>로딩 중...</div>;

  if (!selectedLectureId || lectures.length === 0) {
    return (
      <div className="container">
        <div className="layout">
          <div className="main">
            <h2>{role === "student" ? "수강 중인 과목이 없습니다." : "운영 중인 과목이 없습니다."}</h2>
            <p>과목 등록 또는 수강 신청을 진행해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="layout">
        <div className="main">
          <div className="subject">
            <select value={selectedLectureId} onChange={handleChange}>
              {lectures.map((lecture) => (
                <option key={lecture.course_id} value={lecture.course_id}>
                  {lecture.course_name}
                </option>
              ))}
            </select>
            <div className="top-right-buttons">
              <button
                className="top-right-btn"
                onClick={() => navigate(`/student/attendance/${selectedLectureId}`)}
              >
                출결 조회
              </button>
              <button
                className="top-right-btn"
                onClick={() => navigate(`/student/syllabus/${selectedLectureId}`)}
              >
                강의계획서 조회
              </button>
            </div>
          </div>

          <h2>{course?.course_name}</h2>

          <div className="circle-buttons">
            <div
              className="circle-button"
              onClick={() => navigate(`/notice/${selectedLectureId}`)}
            >
              <div className="circle-icon">
                <FaBullhorn size={70} />
                <span className="circle-label">공지사항</span>
              </div>
            </div>
            <div
              className="circle-button"
              onClick={() => navigate(`/qna/${selectedLectureId}`)}
            >
              <div className="circle-icon">
                <FaQuestionCircle size={70} />
                <span className="circle-label">Q&A</span>
              </div>
            </div>
          </div>

          <div className="lecture-post">
            <div className="board">
              <div
                className="bottom-board-title"
                onClick={() => navigate(`/archives/${selectedLectureId}`)}
              >
                강의 자료실
              </div>
              <ul className="post-list">
                {archives.slice(0, 3).map((item) => (
                  <tr key={item.id}>
                    <td
                      className="post-item"
                      onClick={() => navigate(`/archives/${selectedLectureId}/${item.id}`)}
                    >
                      {item.title}
                    </td>
                  </tr>
                ))}
              </ul>
            </div>

            <div className="board">
              <div
                className="bottom-board-title"
                onClick={() => navigate(`/assignment/${selectedLectureId}`)}
              >
                과제 제출
              </div>
              <ul className="post-list">
                {assignments.slice(0, 3).map((assignment) => {
                  const assignmentId = assignment.assignment_id;

                  let path;
                  if (role === "faculty") {
                    path = `/professor/assignment/${selectedLectureId}/${assignmentId}`;
                  } else {
                    path = assignment.submitted
                      ? `/assignment/${selectedLectureId}/${assignmentId}/${userId}`
                      : `/student/assignment/${selectedLectureId}/${assignmentId}`;
                  }

                  return (
                    <tr key={assignmentId}>
                      <td className="post-item" onClick={() => navigate(path)}>
                        {assignment.title}
                      </td>
                    </tr>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
