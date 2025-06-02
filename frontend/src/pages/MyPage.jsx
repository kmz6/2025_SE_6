import { useState, useEffect } from "react";
import * as S from "../styles/MyPage.style";
import { UserTableRows } from "../components/MyPage/UserTableRows";
import EditInfo from "../components/MyPage/EditInfo";
import EditPassword from "../components/MyPage/EditPassword";
import { useParams } from "react-router-dom";
import { getMyInfo, patchMyInfo } from "../apis/my/my";

const MyPage = () => {
  const { userId } = useParams();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userType, userInfo } = await getMyInfo(userId);
        setUserType(userType);
        setUserInfo(userInfo);
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err.message);
        setUserInfo(null);
      }
    };
    fetchData();
  }, [userId]);

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
          initialPhone={userInfo.telephone}
          initialEmail={userInfo.email}
          onCancel={() => setIsEditingInfo(false)}
          onSave={async (updatedData) => {
            try {
              const updated = await patchMyInfo(userId, updatedData);
              setUserInfo((prev) => ({ ...prev, ...updated }));
              setIsEditingInfo(false);
            } catch (err) {
              console.error("개인정보 수정 실패:", err.message);
            }
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
