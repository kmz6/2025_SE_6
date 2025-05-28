import React from "react";
import styled from "styled-components";
import Timetable from "../components/Timetable";
import { HomeWrapper, Section, SectionTitle, CourseRow, CourseName, Button, ButtonGroup } from "../styles/HomePage.style";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { courseData } from "../mocks/courseData";

const mockSubjects = [
  { name: "정보보호이론", day: "월", time: 2, color: "#e7b4f0", lectureId: 1 },
  { name: "소프트웨어공학", day: "월", time: 5, color: "#a0e2e2", lectureId: 2 },
  { name: "생명과기술", day: "월", time: 6, color: "#f3cc7f", lectureId: 3 },
  { name: "산학협력캡스톤설계", day: "화", time: 5, color: "#d9b4f0", lectureId: 4 },
  { name: "생명과기술", day: "수", time: 5, color: "#f3cc7f", lectureId: 3 },
  { name: "소프트웨어공학", day: "수", time: 6, color: "#a0e2e2", lectureId: 2 },
  { name: "산학협력캡스톤설계", day: "목", time: 6, color: "#d9b4f0", lectureId: 4 },
  { name: "클래식음악의역사", day: "토", time: 7, color: "#a4dfb7", lectureId: 5 },
];

// 과목명 중복 제거
const courseList = Array.from(
  new Map(mockSubjects.map((s) => [s.lectureId, { name: s.name, lectureId: s.lectureId }])).values()
);

function HomePage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;

  const isStudent = user.user_type === "student";
  const isFaculty = user.user_type === "faculty";
  const isStaff = user.user_type === "staff";


  // faculty_id가 본인인 과목만 필터
  const facultyCourses = isFaculty
    ? courseData.filter((course) => course.faculty_id === user.user_id)
    : [];

  return (
    <HomeWrapper>

      {/* 시간표 */}
      {isStudent && (
        <Section>
          <SectionTitle>시간표</SectionTitle>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <select>
              <option>2025년 1학기</option>
              <option>2024년 2학기</option>
            </select>
          </div>
          <Timetable subjects={mockSubjects} />
        </Section>
      )}

      {/* 수강과목 */}
      {isStudent && (
        <Section>
          <SectionTitle>수강과목</SectionTitle>
          {courseList.map((course) => (
            <CourseRow key={course.lectureId}>
              <CourseName onClick={() => navigate(`/lectureroom/${course.lectureId}`)}>{course.name}</CourseName>
              <ButtonGroup>
                {/* 여기에 navigate 연결 */}
                <Button
                  bg="#a9d9b3"
                  onClick={() => navigate(`/notice/${encodeURIComponent(course.name)}`)}
                >
                  공지사항
                </Button>

                <Button
                  bg="#d0d7e5"
                  onClick={() => navigate(`/archives/${encodeURIComponent(course.name)}`)}
                >
                  강의자료실
                </Button>
                <Button
                  bg="#f2c0c0"
                  onClick={() => navigate(`/archives/${encodeURIComponent(course.name)}`)}
                >
                  과제 제출
                </Button>
              </ButtonGroup>
            </CourseRow>
          ))}
        </Section>
      )}

      {/* 강의과목 */}
      {isFaculty && (
        <Section>
          <SectionTitle>강의 과목</SectionTitle>
          {facultyCourses.map((course) => (
            <CourseRow key={course.course_id}>
              <CourseName onClick={() => navigate(`/lectureroom/${course.course_id}`)}>
                {course.course_name}
              </CourseName>
              <ButtonGroup>
                <Button
                  bg="#a9d9b3"
                  onClick={() => navigate(`/professor/attendance/${course.course_id}`)}
                >
                  출석
                </Button>
                <Button
                  bg="#d0d7e5"
                  onClick={() => navigate(`/professor/notice/${course.course_id}/write`)}
                >
                  공지
                </Button>
                <Button
                  bg="#f2c0c0"
                  onClick={() => navigate(`/professor/grade/input/${course.course_id}`)}
                >
                  성적
                </Button>
                <Button
                  bg="#abd7eb"
                  onClick={() => navigate(`/professor/assignment/${course.course_id}`)}
                >
                  과제
                </Button>
              </ButtonGroup>
            </CourseRow>
          ))}
        </Section>
      )}

      {/* 강의과목 */}
      {isStaff && (
        <Section>
          <SectionTitle>알림</SectionTitle>

          <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
            <div
              onClick={() => navigate("/staff/leave/approval")}
              style={{
                flex: "1 1 200px",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                cursor: "pointer", // 👈 포인터 커서
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            >
              <strong>학적 변경 요청</strong>
              <p style={{ fontSize: "24px", marginTop: "10px", color: "#cc4400" }}>2건</p>
            </div>
          </div>
        </Section>
      )}
      {isStaff && (
        <div
          onClick={() => window.open("https://www.kw.ac.kr/ko", "_blank")}
          style={{
            marginBottom: "40px",
            width: "fit-content",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "auto",
            transition: "transform 0.3s ease", // 👉 div에 넣음
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src="/images/kwlogo.svg"
            alt="학교 배너"
            style={{
              width: "160px",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}
    </HomeWrapper>
  );
}

export default HomePage;
