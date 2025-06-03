import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import { getStudInfo } from "../../apis/studinfo/student";
import { getStudLeaveInfo, postLeaveRequest } from "../../apis/leave/leave";
import * as S from "../../styles/LeaveRequest.style";

function LeaveRequestPage() {
  const { user } = useUser(); // user 정보
  const [enrollStatus, setEnrollStatus] = useState(""); // 휴복학 상태
  const [leaveData, setleaveData] = useState([]); // 휴복학 정보

  // 휴복학 신청 버튼 클릭 시 요청 보내기
  const handleLeaveRequest = async (type) => {
    try {
      if (!user) {
        alert("사용자 정보가 없습니다.");
        return;
      }

      // 요청 종류
      const confirmed = window.confirm(
        type === "on_leave" ? "휴학 신청을 하시겠습니까?" : "복학 신청을 하시겠습니까?"
      );
      if (!confirmed) return;

      await postLeaveRequest(user.user_id, type);
      alert(type === "on_leave" ? "휴학 신청이 완료되었습니다." : "복학 신청이 완료되었습니다.");

      window.location.reload(); // 새로고침

    } catch (error) {
      alert("요청 중 오류가 발생했습니다.");
      console.error(error);
    }
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
          onClick={() => handleLeaveRequest("leave")}
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
          leaveData.map((leave, index) => (
            <S.Row key={index}>
              <S.Cell>{leave.request_type === 'return' ? '복학' : '휴학'}</S.Cell>
              <S.Cell>{leave.request_date.split('T')[0]}</S.Cell>
              <S.Cell>
                {leave.status === 'pending' ? '대기'
                  : leave.status === 'approved' ? '승인' : '거부'}
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
    </S.Container>
  );
}

export default LeaveRequestPage;
