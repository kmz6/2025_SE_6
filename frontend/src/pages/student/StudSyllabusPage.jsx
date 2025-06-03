import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Table,
  TwoColRow,
  TwoColHead,
  TwoColCell
} from "../../styles/Syllabus.style";
import { getCourseDetail } from "../../apis/syllabus/syllabus";

export default function StudSyllabusPage() {
  const { lectureId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!lectureId) return;
    getCourseDetail(lectureId)
      .then((data) => setCourse(data))
      .catch((err) => console.error("강의계획서 로드 실패", err));
  }, [lectureId]);

  if (!course) {
    return <Container>강의 정보를 불러오는 중입니다...</Container>;
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
            value2={`${course.course_year}-${course.course_semester}`}
          />
          <TableRow
            label="학정번호"
            value={course.course_code}
            label2="이수구분"
            value2={course.course_type}
          />
          <TableRow
            label="강의시간"
            value={course.course_times}
            label2="강의실"
            value2={`${course.building} ${course.room}`}
          />
          <TableRow
            label="담당교수"
            value={course.faculty_name}
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