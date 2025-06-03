import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import * as S from "../../styles/StudRankPage.style";

import { gradePoints } from '../../constants/gradePoints';

const StudRankPage = () => {
  const { user } = useUser(); // user 정보

  const [rankData, setRankData] = useState([]); // 학기별 성적 정보

  if (!user) {
    return <div>로딩 중...</div>;
  }

  /*
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
  */

  return (
    <S.Container>
      <S.Title>학습 결과</S.Title>
      <S.SubTitle>기본 정보</S.SubTitle>
      <StudInfo user_id={user.user_id}></StudInfo>

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
          <S.Row>
            <S.Cell></S.Cell>
            <S.Cell></S.Cell>
            <S.Cell></S.Cell>
            <S.Cell></S.Cell>
          </S.Row>
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default StudRankPage;
