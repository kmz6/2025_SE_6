import React from "react";
import { useParams } from "react-router-dom";
import { courseData } from "../mocks/courseData";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 2rem;
  width: 100%;
`;

const ContentBox = styled.div`
  border: 1px solid #ccc;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  word-wrap: break-word;
`;

export default function StudSyllabusPage() {
  const { lectureId } = useParams();

  const course = courseData.find(
    (c) => String(c.course_id) === String(lectureId)
  );

  if (!course) {
    return <PageWrapper>해당 강의 정보를 찾을 수 없습니다.</PageWrapper>;
  }

  return (
    <PageWrapper>
      <ContentBox>
        <SectionTitle>강의계획서 조회</SectionTitle>
        <StyledTable>
          <tbody>
            <TableRow label="교과목명" value={course.course_name} label2="년도학기" value2="25-1" />
            <TableRow label="학정번호" value={course.course_code} label2="이수구분" value2={course.course_type} />
            <TableRow label="강의시간" value={formatTime(course.time)} label2="강의실" value2={`${course.building_name} ${course.room_number}`} />
            <TableRow label="담당교수" value={course.faculty_id} label2="학점" value2={course.credit} />
            <TableRow label="출석 비율" value={course.attendance} label2="중간고사 비율" value2={course.midterm_exam} />
            <TableRow label="기말고사 비율" value={course.final_exam} label2="과제 비율" value2={course.assignment} />
            <tr>
              <Th>기타 비율</Th>
              <Td colSpan={3}>{course.etc}</Td>
            </tr>
          </tbody>
        </StyledTable>
      </ContentBox>
    </PageWrapper>
  );
}

function TableRow({ label, value, label2, value2 }) {
  return (
    <tr>
      <Th>{label}</Th>
      <Td>{value}</Td>
      <Th>{label2}</Th>
      <Td>{value2}</Td>
    </tr>
  );
}

function formatTime(timeArray) {
  if (!timeArray || timeArray.length === 0) return "-";
  return timeArray.map(t => `${t.course_day}${t.course_period}`).join(", ");
}