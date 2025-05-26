import React, { useState } from "react";
import * as S from "../../styles/LeaveApproval.style";

import { userData, studentData } from "../../mocks/userData";

import { leaveData } from "../../mocks/leaveData";

function LeaveApprovalPage() {
  const userType = userData.user_type; //현재 사용자의 type 확인

  return (
    <S.Container>
      <S.Title>학적관리</S.Title>
      {userType === "staff" ? (
        <>
          <S.SubTitle>휴복학 승인</S.SubTitle>
          <S.Table>
            <thead>
              <S.Row>
                <S.CellHead>이름</S.CellHead>
                <S.CellHead>학번</S.CellHead>
                <S.CellHead>신청 종류</S.CellHead>
                <S.CellHead>신청일</S.CellHead>
                <S.CellHead>처리 상태</S.CellHead>
              </S.Row>
            </thead>
            <tbody>
              <S.Row>
                <S.Cell>농담곰</S.Cell>
                <S.Cell>{leaveData.student_id}</S.Cell>
                <S.Cell>
                  {leaveData.request_type === "leave" ? "휴학" : "복학"}
                </S.Cell>
                <S.Cell>{leaveData.request_date}</S.Cell>
                <S.Cell>
                  {leaveData.status === "pending" ? (
                    <S.ButtonWrapper>
                      <S.ApproveButton>승인</S.ApproveButton>
                      <S.RejectButton>반려</S.RejectButton>
                    </S.ButtonWrapper>
                  ) : leaveData.status === "approved" ? (
                    "승인"
                  ) : (
                    "반려"
                  )}
                </S.Cell>
              </S.Row>
            </tbody>
          </S.Table>
        </>
      ) : null}
    </S.Container>
  );
}

export default LeaveApprovalPage;
