import { useState } from "react";
import * as S from "../../styles/StudRankPage.style";

import {
  userData,
  studentData,
  facultyData,
  staffData,
} from "../../mocks/userData";

import { attendData } from "../../mocks/gradeData";

const StudRankPage = () => {
  const userType = userData.user_type; //현재 사용자의 type 확인

  //user type에 따라 정보 초기화
  const initialUserInfo =
    userType === "student"
      ? studentData
      : userType === "faculty"
      ? facultyData
      : userType === "staff"
      ? staffData
      : null;

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  //평점을 점수로 변환
  const gradeToPoint = {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  //학기별 학점 수 및 평점 계산
  function calculateScoreInfo(attendData) {
    const result = [];

    for (const semester in attendData) {
      const courses = attendData[semester];

      let totalCredits = 0;
      let totalGradePoints = 0;

      courses.forEach((course) => {
        const credit = course.credit;
        const grade = course.grade;
        const gradePoint = gradeToPoint[grade] || 0;

        totalCredits += credit;
        totalGradePoints += gradePoint * credit;
      });

      const totalScore =
        totalCredits > 0
          ? (totalGradePoints / totalCredits).toFixed(2)
          : "0.00";

      result.push({
        semester,
        totalCredits,
        totalScore,
      });
    }

    return result;
  }

  const semesterResults = calculateScoreInfo(attendData);

  return (
    <S.Container>
      <S.Title>학습 결과</S.Title>
      {userType === "student" ? (
        <>
          <S.SubTitle>기본 정보</S.SubTitle>
          <S.Table>
            <S.Row>
              <S.CellHead>이름</S.CellHead>
              <S.Cell>{userInfo.name}</S.Cell>
              <S.CellHead>학번</S.CellHead>
              <S.Cell>{userInfo.student_id}</S.Cell>
              <S.CellHead>학과</S.CellHead>
              <S.Cell>{userInfo.department}</S.Cell>
              <S.CellHead>학적상태</S.CellHead>
              <S.Cell>
                {userInfo.enrollment_status === "enrolled"
                  ? "재학"
                  : userInfo.enrollment_status === "on_leave"
                  ? "휴학"
                  : userInfo.enrollment_status}
              </S.Cell>
            </S.Row>
          </S.Table>

          <S.SubTitle>석차 조회</S.SubTitle>
          <S.Table>
            <thead>
              <S.Row>
                <S.CellHead>학기</S.CellHead>
                <S.CellHead>신청학점</S.CellHead>
                <S.CellHead>평점</S.CellHead>
                <S.CellHead>학과석차</S.CellHead>
              </S.Row>
            </thead>
            <tbody>
              {semesterResults.map(({ semester, totalCredits, totalScore }) => (
                <S.Row key={semester}>
                  <S.Cell>{semester}</S.Cell>
                  <S.Cell>{totalCredits}</S.Cell>
                  <S.Cell>{totalScore}</S.Cell>
                  <S.Cell>등수 / 학생수</S.Cell>
                </S.Row>
              ))}
            </tbody>
          </S.Table>
        </>
      ) : (
        <S.WarningMessage>학습결과 조회는 학생만 가능합니다.</S.WarningMessage>
      )}
    </S.Container>
  );
};

export default StudRankPage;
