import React from "react";
import { useParams } from "react-router-dom";
import { courseData, facultyMap } from "../../mocks/courseData";
import { 
  Container, 
  Title, 
  Table, 
  TwoColRow, 
  TwoColHead, 
  TwoColCell
 } from "../../styles/Syllabus.style";

export default function StudSyllabusPage() {
  const { lectureId } = useParams();

  const course = courseData.find(
    (c) => String(c.course_id) === String(lectureId)
  );

  if (!course) {
    return <Container>해당 강의 정보를 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Title>강의계획서 조회</Title>
      <Table>
        <tbody>
          <TableRow
            label="교과목명"
            value={course.course_name}
            label2="년도학기"
            value2="25-1"
          />
          <TableRow
            label="학정번호"
            value={course.course_code}
            label2="이수구분"
            value2={course.course_type}
          />
          <TableRow
            label="강의시간"
            value={formatTime(course.time)}
            label2="강의실"
            value2={`${course.building_name} ${course.room_number}`}
          />
          <TableRow
            label="담당교수"
            value={facultyMap[course.faculty_id]}
            label2="학점"
            value2={course.credit}
          />
          <TableRow
            label="출석 비율"
            value={course.attendance}
            label2="중간고사 비율"
            value2={course.midterm_exam}
          />
          <TableRow
            label="기말고사 비율"
            value={course.final_exam}
            label2="과제 비율"
            value2={course.assignment}
          />
          <TwoColRow>
            <TwoColHead>기타 비율</TwoColHead>
            <TwoColCell colSpan={3}>{course.etc}</TwoColCell>
          </TwoColRow>
        </tbody>
      </Table>
    </Container>
  );
}

function TableRow({ label, value, label2, value2 }) {
  return (
    <TwoColRow>
      <TwoColHead>{label}</TwoColHead>
      <TwoColCell>{value}</TwoColCell>
      <TwoColHead>{label2}</TwoColHead>
      <TwoColCell>{value2}</TwoColCell>
    </TwoColRow>
  );
}

function formatTime(timeArray) {
  if (!timeArray || timeArray.length === 0) return "-";
  return timeArray.map((t) => `${t.course_day}${t.course_period}`).join(", ");
}