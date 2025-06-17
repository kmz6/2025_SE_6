import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import { getStudInfo } from "../../apis/studinfo/student";
import { getStudLeaveInfo, postLeaveRequest, deleteLeaveRequest } from "../../apis/leave/studLeave";
import * as S from "../../styles/LeaveRequest.style";

function LeaveRequestPage() {
  const { user } = useUser(); // user 정보
  const [enrollStatus, setEnrollStatus] = useState(""); // 휴복학 상태
  const [leaveData, setleaveData] = useState([]); // 휴복학 정보

  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState({ onConfirm: () => { }, onCancel: () => { } });
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);

  // 휴복학 신청 버튼 클릭 시 요청 보내기
  const handleLeaveRequest = async (type) => {
    try {
      if (!user) {
        openModal("사용자 정보가 없습니다.");
        return;
      }

      // 요청 종류
      const confirmed = await showConfirmModal(type === "on_leave" ? "휴학 신청을 하시겠습니까?" : "복학 신청을 하시겠습니까?");
      if (!confirmed) return;

      await postLeaveRequest(user.user_id, type);
      openModal(type === "on_leave" ? "휴학 신청이 완료되었습니다." : "복학 신청이 완료되었습니다.");
    } catch (error) {
      openModal("요청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  // 휴복학 신청 취소
  const handleCancel = async (req_id) => {
    try {
      const confirmed = await showConfirmModal("신청을 취소하시겠습니까?");
      if (!confirmed) return;

      await deleteLeaveRequest(req_id);
      openModal("취소가 완료되었습니다.");

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

  // 휴복학 정보 불러오기
  useEffect(() => {
    if (!user) return; //user 없어도 계속 hook 호출

    const fetchStatus = async () => {
      const studInfo = await getStudInfo(user.user_id);
      setEnrollStatus(studInfo.enrollment_status);
    }

    const fetchLeaveData = async () => {
      const leaves = await getStudLeaveInfo(user.user_id);
      setleaveData(leaves);
    };

    fetchStatus();
    fetchLeaveData();
  }, [user]);

  //정보를 불러오는 중인 경우
  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.Container>
      <S.Title>학적관리</S.Title>
      <S.SubTitle>휴복학 신청</S.SubTitle>
      <StudInfo user_id={user.user_id}></StudInfo>

      <S.ButtonWrapper>
        <S.LeaveButton
          disabled={enrollStatus !== "enrolled"}
          onClick={() => handleLeaveRequest("on_leave")}
        >
          휴학 신청
        </S.LeaveButton>

        <S.ReturnButton
          disabled={enrollStatus !== "on_leave"}
          onClick={() => handleLeaveRequest("return")}
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
        {leaveData && leaveData.length > 0 ? (
          leaveData.map((leave) => (
            <S.Row key={leave.request_id}>
              <S.Cell>{leave.request_type === 'return' ? '복학' : '휴학'}</S.Cell>
              <S.Cell>{leave.request_date.split('T')[0]}</S.Cell>
              <S.Cell>
                {leave.status === 'pending' ? (
                  <S.PendingWrapper>
                    대기
                    <S.TrashIcon
                      onClick={() => handleCancel(leave.request_id)}
                      title="신청 취소"
                    />
                  </S.PendingWrapper>
                ) : leave.status === 'approved' ? '승인' : '반려'}
              </S.Cell>
            </S.Row>
          ))
        ) : (
          <S.Row>
            <S.Cell colSpan={3} style={{ textAlign: 'center', color: '#999' }}>
              휴복학 신청 이력이 없습니다.
            </S.Cell>
          </S.Row>
        )}
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
    </S.Container>
  );
}

export default LeaveRequestPage;
