import { useState } from "react";
import * as S from "./StudRankPage.style";

import {
  userData,
  studentData,
  facultyData,
  staffData,
} from "../mocks/userData";

import {
  attendData
} from "../mocks/gradeData";

const StudRankPage = () => {
  const userType = userData.user_type; //현재 사용자의 type 확인

  const [selectedSemester, setSelectedSemester] = useState("2024-2");
  const subjects = attendData[selectedSemester] || []; //학기 과목

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

  return (
    <S.Container>
      <S.Title>학습성과</S.Title>
      {userType === "student" ? (
        <>
          <S.SubTitle>수강/성적 조회</S.SubTitle>
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

          <S.SelectWrapper>
            <S.SelectLabel htmlFor="semester">학기 선택</S.SelectLabel>
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
        <S.WarningMessage>수강/성적 조회는 학생만 가능합니다.</S.WarningMessage>
      )
      }
    </S.Container >
  );
};

export default StudRankPage;