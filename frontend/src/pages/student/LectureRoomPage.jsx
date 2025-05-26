import React from "react";
import "./LectureRoomPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function LectureRoom() {
  const navigate = useNavigate();
  const { lectureId } = useParams();

  return (
    <div className="container">
      <div className="layout">
        <div className="main">
          <div className="subject">
            <select>
              <option>정보보호이론</option>
              <option>산학협력캡스톤설계</option>
              <option>소프트웨어공학</option>
            </select>
            <div className="top-right-buttons">
              <button className="top-right-btn">출결 조회</button>
              <button className="top-right-btn">강의계획서 조회</button>
            </div>
          </div>
          <div className="circle-buttons">
            <div
              className="circle-button"
              onClick={() => navigate(`/notice/${lectureId}`)}
            >
              <div className="circle-icon">
                📢
                <br />
                <span className="circle-label">공지사항</span>
              </div>
            </div>
            <div className="circle-button">
              <div className="circle-icon">
                ▶️
                <br />
                <span className="circle-label">온라인 강의</span>
              </div>
            </div>
            <div className="circle-button">
              <div className="circle-icon">
                ❓<br />
                <span className="circle-label">Q&A</span>
              </div>
            </div>
          </div>
          <div className="lecture-post">
            <div className="board">
              <div className="board-title">강의 자료실</div>
              <ul className="post-list">
                <li className="post-item">1주차 강의자료.pdf</li>
                <li className="post-item">2주차 과제 안내.docx</li>
                <li className="post-item">3주차 슬라이드.pptx</li>
                <li className="post-item">4주차 참고자료.zip</li>
                <li className="post-item">5주차 실습코드.java</li>
              </ul>
            </div>
            <div className="board">
              <div className="board-title">과제 제출</div>
              <ul className="post-list">
                <li className="post-item">1주차 강의자료.pdf</li>
                <li className="post-item">2주차 과제 안내.docx</li>
                <li className="post-item">3주차 슬라이드.pptx</li>
                <li className="post-item">4주차 참고자료.zip</li>
                <li className="post-item">5주차 실습코드.java</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
