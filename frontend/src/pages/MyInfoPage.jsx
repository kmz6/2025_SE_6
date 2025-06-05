import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditInfo from "../components/MyPage/EditInfo";
import { getMyInfo, patchMyInfo } from "../apis/my/my";
import * as S from "../styles/MyPage.style";

const MyInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userInfo } = await getMyInfo(userId);
        setUserInfo(userInfo);
      } catch (err) {
        setError("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "개인정보가 성공적으로 수정되었습니다.") {
      navigate(`/my/${userId}`);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const updated = await patchMyInfo(userId, updatedData);
      setUserInfo((prev) => ({ ...prev, ...updated }));
      openModal("개인정보가 성공적으로 수정되었습니다.");
    } catch (err) {
      openModal("개인정보 수정에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!userInfo) return <p>사용자 정보를 찾을 수 없습니다.</p>;

  return (
    <S.Container>
      <S.Title>개인정보 수정</S.Title>
      <S.br></S.br>
      <EditInfo
        initialPhone={userInfo.telephone}
        initialEmail={userInfo.email}
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

export default MyInfoPage;
