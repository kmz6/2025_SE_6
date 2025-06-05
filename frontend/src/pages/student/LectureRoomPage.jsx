import React, { useEffect, useState } from "react";
import "./LectureRoomPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMyLectures } from "../../hooks/useMyLectures";
import { useLectureDetail } from "../../hooks/useLectureDetail";
import { useUser } from "../../context/UserContext";
import { FaBullhorn, FaQuestionCircle } from "react-icons/fa";

export default function LectureRoomPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { lectureId: paramLectureId } = useParams();

  const role = user?.user_type === "faculty" ? "faculty" : "student";
  const userId = user?.user_id;

  const { data: lectures = [], isLoading } = useMyLectures(userId, role);
  const [selectedLectureId, setSelectedLectureId] = useState(paramLectureId);

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
                onClick={() => navigate(`/professor/attendance/${selectedLectureId}`)}
              >
                출결 조회
              </button>
              <button
                className="top-right-btn"
                onClick={() => navigate(`/professor/syllabus/${selectedLectureId}`)}
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
                <li className="post-item">1주차 강의자료.pdf</li>
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
                <li className="post-item">1주차 과제 안내.docx</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
