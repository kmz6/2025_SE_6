import React, { useState } from "react";
import * as S from "../../styles/LeaveRequest.style";
import {
  userData,
  studentData,
  facultyData,
  staffData,
} from "../../mocks/userData";

function LeaveRequestPage() {
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

  return (
    <S.Container>
      <S.Title>학적관리</S.Title>
      {userType === "student" ? (
        <>
          <S.SubTitle>휴복학 신청</S.SubTitle>
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
          <S.ButtonWrapper>
            <S.LeaveButton
              disabled={userInfo.enrollment_status !== "enrolled"}
              onClick={() => {
                if (window.confirm("휴학 신청을 하시겠습니까?")) {
                  alert("휴학 신청이 완료되었습니다.");
                }
              }}
            >
              휴학 신청
            </S.LeaveButton>
            <S.ReturnButton
              disabled={userInfo.enrollment_status !== "on_leave"}
              onClick={() => {
                if (window.confirm("복학 신청을 하시겠습니까?")) {
                  alert("복학 신청이 완료되었습니다.");
                }
              }}
            >
              복학 신청
            </S.ReturnButton>
          </S.ButtonWrapper>

          <S.SubTitle>신청 내역</S.SubTitle>
          <S.Table>
            <thead>
              <S.Row>
                <S.CellHead>신청 종류</S.CellHead>
                <S.CellHead>신청일</S.CellHead>
                <S.CellHead>처리 상태</S.CellHead>
              </S.Row>
            </thead>
            <tbody>
              <S.Cell>복학</S.Cell>
              <S.Cell>2025.01.10</S.Cell>
              <S.Cell>처리 완료</S.Cell>
            </tbody>
          </S.Table>
        </>
      ) : (
        <S.WarningMessage>휴복학 신청은 학생만 가능합니다.</S.WarningMessage>
      )}
    </S.Container>
  );
}

export default LeaveRequestPage;
