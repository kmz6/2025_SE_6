import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "../../styles/Syllabus.style";
import { getCourseDetail } from "../../apis/syllabus/syllabus";
import axiosInstance from "../../apis/axiosInstance";

export default function StudSyllabusPage() {
  const { lectureId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // 정수면 course_id → 변환
        let courseCode = lectureId;

        if (!isNaN(Number(lectureId))) {
          const res = await axiosInstance.get(`/api/course/${lectureId}/code`);
          courseCode = res.data.course_code;
        }

        const courseData = await getCourseDetail(courseCode);
        setCourse(courseData);
      } catch (err) {
        console.error("강의계획서 로드 실패", err);
      }
    };

    if (lectureId) fetchCourseDetail();
  }, [lectureId]);

  if (!course) {
    return <S.Container>강의 정보를 불러오는 중입니다...</S.Container>;
  }

  return (
    <S.Container>
      <S.Title>강의계획서 조회</S.Title>
      <S.Table>
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
          <S.TwoColRow>
            <S.TwoColHead>기타 비율</S.TwoColHead>
            <S.TwoColCell colSpan={3}>{course.etc}</S.TwoColCell>
          </S.TwoColRow>
        </tbody>
      </S.Table>
    </S.Container>
  );
}

function TableRow({ label, value, label2, value2 }) {
  return (
    <S.TwoColRow>
      <S.TwoColHead>{label}</S.TwoColHead>
      <S.TwoColCell>{value}</S.TwoColCell>
      <S.TwoColHead>{label2}</S.TwoColHead>
      <S.TwoColCell>{value2}</S.TwoColCell>
    </S.TwoColRow>
  );
}