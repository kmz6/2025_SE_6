import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

const MyPage = () => {
  const { userId } = useParams();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const id = userId;

    // studentData 객체(나머진 배열)
    if (studentData.student_id === id) {
      setUserType("student");
      setUserInfo(studentData);
      return;
    }

    let foundUser = facultyData.find((user) => user.faculty_id === id);
    if (foundUser) {
      setUserType("faculty");
      setUserInfo(foundUser);
      return;
    }

    foundUser = staffData.find((user) => user.staff_id === id);
    if (foundUser) {
      setUserType("staff");
      setUserInfo(foundUser);
      return;
    }

    setUserType(null);
    setUserInfo(null);
  }, [userId]);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  if (!userInfo) return <div>사용자 정보를 찾을 수 없습니다.</div>;

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
