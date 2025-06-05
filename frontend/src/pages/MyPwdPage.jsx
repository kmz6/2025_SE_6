import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPassword from "../components/MyPage/EditPassword";
import { getMyInfo, patchMyPassword } from "../apis/my/my";
import * as S from "../styles/MyPage.style";

const MyPwdPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userCurrentPassword, setUserCurrentPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    navigate(`/my/${userId}`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userInfo } = await getMyInfo(userId);
        setUserCurrentPassword(userInfo.password);
      } catch (err) {
        setError("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleSave = async ({ currentPwd, newPwd }) => {
    try {
      await patchMyPassword(userId, {
        currentPassword: currentPwd,
        newPassword: newPwd,
      });
      setModalMessage("비밀번호가 성공적으로 변경되었습니다.");
      setModalVisible(true);
    } catch (err) {
      throw err;
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.br />
      <EditPassword
        userCurrentPassword={userCurrentPassword}
        onCancel={() => navigate(`/my/${userId}`)}
        onSave={handleSave}
      />

      {modalVisible && (
        <S.ModalOverlay>
          <S.Modal>
            <p>{modalMessage}</p>
            <S.ModalCloseButton onClick={closeModal}>확인</S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default MyPwdPage;
