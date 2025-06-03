import { useEffect, useState } from "react";
import * as S from "../../styles/LeaveApproval.style";

import { getLeaveAll } from "../../apis/leave/staffLeave";

function LeaveApprovalPage() {

  const [requestData, setRequestData] = useState([]); // 휴복학 요청 정보

  // 휴복학 요청 정보 불러오기
  useEffect(() => {
    const fetchLeaveRequest = async () => {
      const request = await getLeaveAll();
      setRequestData(request);
    };

    fetchLeaveRequest();
  });

  return (
    <S.Container>
      <S.Title>학적관리</S.Title>
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
          {requestData && requestData.length > 0 ? (
            requestData.map((request, index) => (
              <S.Row key={index}>
                <S.Cell>{request.name}</S.Cell>
                <S.Cell>{request.student_id}</S.Cell>
                <S.Cell>
                  {request.request_type === 'return' ? '복학' : '휴학'}
                </S.Cell>
                <S.Cell>{request.request_date.split('T')[0]}</S.Cell>
                <S.Cell>
                  {request.status === "pending" ? (
                    <S.ButtonWrapper>
                      <S.ApproveButton>승인</S.ApproveButton>
                      <S.RejectButton>반려</S.RejectButton>
                    </S.ButtonWrapper>
                  ) : request.status === "approved" ? (
                    "승인"
                  ) : (
                    "반려"
                  )}
                </S.Cell>
              </S.Row>
            ))
          ) : (
            <S.Row>
              <S.Cell colSpan={5} style={{ textAlign: 'center', color: '#999' }}>
                휴복학 요청 이력이 없습니다.
              </S.Cell>
            </S.Row>
          )}
        </tbody>
      </S.Table>
    </S.Container>
  );
}

export default LeaveApprovalPage;
