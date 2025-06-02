import React, { useEffect, useState } from "react";
import axios from "axios";
import Timetable from "../components/Timetable";
import { HomeWrapper, Section, SectionTitle, CourseRow, CourseName, Button, ButtonGroup } from "../styles/HomePage.style";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { courseData } from "../mocks/courseData";

function HomePage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (user?.user_type === "student") {
      axios
        .get(`http://localhost:2025/timetable/${user.user_id}`)
        .then((res) => {
          setSubjects(res.data);
        })
        .catch((err) => {
          console.error("시간표 로딩 실패:", err);
        });
    }
  }, [user]);

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;

  const isStudent = user.user_type === "student";
  const isFaculty = user.user_type === "faculty";
  const isStaff = user.user_type === "staff";

  const facultyCourses = isFaculty
    ? courseData.filter((course) => course.faculty_id === user.user_id)
    : [];

  // 중복 제거한 과목 리스트 생성
  const courseList = Array.from(
    new Map(subjects.map((s) => [s.lectureId, { name: s.name, lectureId: s.lectureId }])).values()
  );

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
          <Timetable subjects={subjects} />
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

      {/* 강의과목 (교수용) */}
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

      {/* 교직원 알림 */}
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
                cursor: "pointer",
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
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src="/images/kwlogo.svg"
            alt="학교 배너"
            style={{ width: "160px", height: "auto", display: "block" }}
          />
        </div>
      )}
    </HomeWrapper>
  );
}

export default HomePage;