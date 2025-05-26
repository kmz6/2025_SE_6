import React from "react";
import styled from "styled-components";
import Timetable from "../components/Timetable";
import { useNavigate } from "react-router-dom";

// 💡 시간표용 mock 데이터 (유지)
const mockSubjects = [
  { name: "정보보호이론", day: "월", time: 2, color: "#e7b4f0" },
  { name: "소프트웨어공학", day: "월", time: 5, color: "#a0e2e2" },
  { name: "생명과기술", day: "월", time: 6, color: "#f3cc7f" },
  { name: "산학협력캡스톤설계", day: "화", time: 5, color: "#d9b4f0" },
  { name: "생명과기술", day: "수", time: 5, color: "#f3cc7f" },
  { name: "소프트웨어공학", day: "수", time: 6, color: "#a0e2e2" },
  { name: "산학협력캡스톤설계", day: "목", time: 6, color: "#d9b4f0" },
  { name: "클래식음악의역사", day: "토", time: 7, color: "#a4dfb7" },
];

// 과목명만 중복 제거
const courseList = [...new Set(mockSubjects.map((s) => s.name))];

// 스타일 정의
const HomeWrapper = styled.div`
  padding: 30px;
`;

const Section = styled.div`
  margin-bottom: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;

const CourseRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
`;

const CourseName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: ${(props) => props.bg || "#ccc"};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  position: relative;
  cursor: pointer; // 👈 마우스 올리면 손모양
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const NoticeButton = styled.button`
  background-color: #a9d9b3;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
`;

const MaterialButton = styled.button`
  background-color: #d0d7e5;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  position: relative;
`;

const NewBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background: red;
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 6px;
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      {/* 시간표 */}
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

      {/* 수강과목 */}
      <Section>
        <SectionTitle>수강과목</SectionTitle>
        {courseList.map((name, index) => (
          <CourseRow key={name}>
            <CourseName>{name}</CourseName>
            <ButtonGroup>
              {/* ⬇ 여기에 navigate 연결 */}
              <Button
                bg="#a9d9b3"
                onClick={() => navigate(`/notice/${encodeURIComponent(name)}`)}
              >
                공지사항
              </Button>

              <Button bg="#d0d7e5">
                강의자료실
                {index === 0 && <NewBadge>N</NewBadge>}
              </Button>
              <Button bg="#f6e3b4">온라인 강의</Button>
              <Button bg="#f2c0c0">과제 제출</Button>
            </ButtonGroup>
          </CourseRow>
        ))}
      </Section>
    </HomeWrapper>
  );
}

export default HomePage;
