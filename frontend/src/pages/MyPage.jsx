import { useState } from "react";
import * as S from "../styles/MyPage.style";
import {
  userData,
  studentData,
  facultyData,
  staffData,
} from "../mocks/userData";
import { UserTableRows } from "../components/MyPage/UserTableRows";
import EditInfo from "../components/MyPage/EditInfo";
import EditPassword from "../components/MyPage/EditPassword";

const MyPage = () => {
  const userType = userData.user_type;

  const initialUserInfo =
    userType === "student"
      ? studentData
      : userType === "faculty"
      ? facultyData
      : userType === "staff"
      ? staffData
      : null;

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <S.Container>
      <S.Title>마이페이지</S.Title>

      <S.Table>
        <tbody>
          {!isEditingInfo && !isEditingPassword && (
            <UserTableRows userType={userType} userInfo={userInfo} />
          )}
        </tbody>
      </S.Table>

      {isEditingInfo && (
        <EditInfo
          initialPhone={userInfo.phone || userInfo.telephone}
          initialEmail={userInfo.email}
          onCancel={() => setIsEditingInfo(false)}
          onSave={(updatedData) => {
            setUserInfo((prev) => ({ ...prev, ...updatedData }));
            setIsEditingInfo(false);
          }}
        />
      )}

      {isEditingPassword && (
        <EditPassword
          userCurrentPassword={userData.password}
          onCancel={() => setIsEditingPassword(false)}
          onSave={(newPwdData) => {
            console.log("비밀번호 변경 완료", newPwdData);
            setIsEditingPassword(false);
          }}
        />
      )}

      {!isEditingInfo && !isEditingPassword && (
        <S.ButtonWrapper>
          <S.Button
            onClick={() => {
              setIsEditingInfo(true);
              setIsEditingPassword(false);
            }}
          >
            개인정보 수정
          </S.Button>
          <S.Button
            onClick={() => {
              setIsEditingPassword(true);
              setIsEditingInfo(false);
            }}
          >
            비밀번호 변경
          </S.Button>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

export default MyPage;
