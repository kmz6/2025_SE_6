import { useState } from "react";
import * as S from "./StudGradePage.style";

import {
  userData,
  studentData,
  facultyData,
  staffData,
} from "../mocks/userData";

import {
  attendData
} from "../mocks/gradeData";

const StudGradePage = () => {
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

  const [selectedSemester, setSelectedSemester] = useState("2024-2");
  const subjects = attendData[selectedSemester] || []; //학기

  //학점 수 계산
  const calculateCredit = (subjectsData) => {
    let totalCredit = 0; //전체
    let majorCredit = 0; //전공
    let generalCredit = 0; //교양

    subjectsData.forEach((subject) => {
      const credit = subject.credit || 0;

      if (subject.course_type === "전공") {
        majorCredit += credit;
      } else if (subject.course_type === "교양") {
        generalCredit += credit;
      }
    });

    totalCredit = majorCredit + generalCredit;

    return { total: totalCredit, major: majorCredit, general: generalCredit };
  };

  const allSubjects = Object.values(attendData).flat(); //데이터 하나로 합치기
  const [creditInfo, setCreditInfo] = useState(() => calculateCredit(allSubjects));

  return (
    <S.Container>
      <S.Title>학습성과</S.Title>
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

          <S.Table>
            <thead>
              <S.Row>
                <S.CellHead>전체 이수학점</S.CellHead>
                <S.CellHead>전공 이수학점</S.CellHead>
                <S.CellHead>교양 이수학점</S.CellHead>
                <S.CellHead>평량 평균</S.CellHead>
              </S.Row>
            </thead>
            <tbody>
              <S.Row>
                <S.Cell>{creditInfo.total}</S.Cell>
                <S.Cell>{creditInfo.major}</S.Cell>
                <S.Cell>{creditInfo.general}</S.Cell>
                <S.Cell></S.Cell>
              </S.Row>
            </tbody>
          </S.Table>

          <S.SubTitle>수강/성적 조회</S.SubTitle>
          <S.SelectWrapper>
            <S.SelectLabel htmlFor="semester">학기 선택 :</S.SelectLabel>
            <S.Select
              onChange={(e) => setSelectedSemester(e.target.value)}>
              {Object.keys(attendData).map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </S.Select>
          </S.SelectWrapper>

          <S.Table>
            <thead>
              <S.Row>
                <S.CellHead>학정번호</S.CellHead>
                <S.CellHead>과목명</S.CellHead>
                <S.CellHead>이수구분</S.CellHead>
                <S.CellHead>학점</S.CellHead>
                <S.CellHead>성적</S.CellHead>
              </S.Row>
            </thead>
            <tbody>
              {subjects.map((subject) => {
                return (
                  <S.Row>
                    <S.Cell>{subject.course_code}</S.Cell>
                    <S.Cell>{subject.course_name}</S.Cell>
                    <S.Cell>{subject.course_type}</S.Cell>
                    <S.Cell>{subject.credit}</S.Cell>
                    <S.Cell>{subject.grade}</S.Cell>
                  </S.Row>
                )
              })}
            </tbody>
          </S.Table>
        </>
      ) : (
        <S.WarningMessage>학습성과 조회는 학생만 가능합니다.</S.WarningMessage>
      )
      }
    </S.Container >
  );
};

export default StudGradePage;