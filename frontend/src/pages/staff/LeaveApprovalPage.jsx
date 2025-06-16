import { useEffect, useState } from "react";
import * as S from "../../styles/LeaveApproval.style";

import { getLeaveAll, patchLeaveApprove, patchLeaveReject } from "../../apis/leave/staffLeave";

function LeaveApprovalPage() {

  const [requestData, setRequestData] = useState([]); // 휴복학 요청 정보

  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState({ onConfirm: () => { }, onCancel: () => { } });
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);

  // 승인 버튼 클릭 시 요청 보내기
  const handleLeaveApprove = async (req_id, req_type) => {
    try {
      const confirmed = await showConfirmModal("승인하시겠습니까?");
      if (!confirmed) return;

      await patchLeaveApprove(req_id, req_type);
      openModal("요청이 완료되었습니다.");
    } catch (error) {
      openModal("요청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  // 반려 버튼 클릭 시 요청 보내기
  const handleLeaveReject = async (req_id) => {
    try {
      const confirmed = await showConfirmModal("반려하시겠습니까?");
      if (!confirmed) return;

      await patchLeaveReject(req_id);
      openModal("요청이 완료되었습니다.");

    } catch (error) {
      openModal("요청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = (onCloseCallback) => {
    setModalVisible(false);
    setCancelVisible(false);
    if (onCloseCallback) onCloseCallback();
  };

  // 확인, 취소 모달
  const showConfirmModal = (message) => {
    return new Promise((resolve) => {
      setModalMessage(message);
      setModalVisible(true);
      setCancelVisible(true);

      // 확인 버튼 누름
      const handleConfirm = () => {
        closeModal();
        resolve(true);
      };

      // 취소 버튼 누름
      const handleCancelClick = () => {
        closeModal();
        resolve(false);
      };

      setModalAction(() => ({
        onConfirm: handleConfirm,
        onCancel: handleCancelClick
      }));
    });
  };

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
            requestData.map((request) => (
              <S.Row key={request.request_id}>
                <S.Cell>{request.name}</S.Cell>
                <S.Cell>{request.student_id}</S.Cell>
                <S.Cell>
                  {request.request_type === 'return' ? '복학' : '휴학'}
                </S.Cell>
                <S.Cell>{request.request_date.split('T')[0]}</S.Cell>
                <S.Cell>
                  <S.StatusWrapper>
                    {request.status === "pending" ? (
                      <>
                        <S.Pending>대기</S.Pending>
                        <S.ButtonWrapper>
                          <S.ApproveButton onClick={() => handleLeaveApprove(request.request_id, request.request_type)} >
                            승인
                          </S.ApproveButton>
                          <S.RejectButton onClick={() => handleLeaveReject(request.request_id)}>
                            반려
                          </S.RejectButton>
                        </S.ButtonWrapper>
                      </>
                    ) : request.status === "approved" ? (
                      "승인"
                    ) : (
                      "반려"
                    )}
                  </S.StatusWrapper>
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

      {modalVisible && (
        <S.ModalOverlay>
          <S.Modal>
            <p>{modalMessage}</p>
            {cancelVisible ? (
              <S.ModalButtonWrapper>
                <S.ModalCloseButton onClick={modalAction.onConfirm}>확인</S.ModalCloseButton>
                <S.ModalCloseButton onClick={modalAction.onCancel}>취소</S.ModalCloseButton>
              </S.ModalButtonWrapper>
            ) : (
              <S.ModalButtonWrapper>
                <S.ModalCloseButton onClick={() => closeModal(() => window.location.reload())}>확인</S.ModalCloseButton>
              </S.ModalButtonWrapper>
            )}
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container >
  );
}

export default LeaveApprovalPage;
