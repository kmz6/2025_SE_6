import * as S from "../../pages/MyPage.style";
import { formatPhoneNumber } from "../../utils/format";

export const UserTableRows = ({ userType, userInfo }) => {
  if (!userInfo) {
    return (
      <S.Row>
        <S.Cell colSpan="4">사용자 정보 없음</S.Cell>
      </S.Row>
    );
  }

  if (userType === "student") {
    return (
      <>
        <S.Row>
          <S.CellHead>이름</S.CellHead>
          <S.Cell>{userInfo.name}</S.Cell>
          <S.CellHead>학적 상태</S.CellHead>
          <S.Cell>
            {userInfo.enrollment_status === "enrolled"
              ? "재학"
              : userInfo.enrollment_status === "on_leave"
              ? "휴학"
              : userInfo.enrollment_status}
          </S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>단과대</S.CellHead>
          <S.Cell>{userInfo.college}</S.Cell>
          <S.CellHead>학부</S.CellHead>
          <S.Cell>{userInfo.department}</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>학번</S.CellHead>
          <S.Cell>{userInfo.student_id}</S.Cell>
          <S.CellHead>사용자 구분</S.CellHead>
          <S.Cell>학생</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>전화번호</S.CellHead>
          <S.Cell colSpan="3">{formatPhoneNumber(userInfo.phone)}</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>이메일</S.CellHead>
          <S.Cell colSpan="3">{userInfo.email}</S.Cell>
        </S.Row>
      </>
    );
  } else if (userType === "faculty") {
    return (
      <>
        <S.Row>
          <S.CellHead>이름</S.CellHead>
          <S.Cell>{userInfo.name}</S.Cell>
          <S.CellHead>사용자 구분</S.CellHead>
          <S.Cell>교수</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>단과대</S.CellHead>
          <S.Cell>{userInfo.college}</S.Cell>
          <S.CellHead>학부</S.CellHead>
          <S.Cell>{userInfo.department}</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>사번</S.CellHead>
          <S.Cell>{userInfo.faculty_id}</S.Cell>
          <S.CellHead>전화번호</S.CellHead>
          <S.Cell>{formatPhoneNumber(userInfo.telephone)}</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>이메일</S.CellHead>
          <S.Cell colSpan="3">{userInfo.email}</S.Cell>
        </S.Row>
      </>
    );
  } else if (userType === "staff") {
    return (
      <>
        <S.Row>
          <S.CellHead>이름</S.CellHead>
          <S.Cell>{userInfo.name}</S.Cell>
          <S.CellHead>사용자 구분</S.CellHead>
          <S.Cell>교직원</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>부서</S.CellHead>
          <S.Cell>{userInfo.department}</S.Cell>
          <S.CellHead>사번</S.CellHead>
          <S.Cell>{userInfo.staff_id}</S.Cell>
        </S.Row>
        <S.Row>
          <S.CellHead>전화번호</S.CellHead>
          <S.Cell>{formatPhoneNumber(userInfo.telephone)}</S.Cell>
          <S.CellHead>이메일</S.CellHead>
          <S.Cell>{userInfo.email}</S.Cell>
        </S.Row>
      </>
    );
  }

  return (
    <S.Row>
      <S.Cell colSpan="4">사용자 정보 없음</S.Cell>
    </S.Row>
  );
};
