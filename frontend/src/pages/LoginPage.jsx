import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthForm from "../components/AuthForm/AuthForm";
import { postLogin } from "../apis/auth/auth";
import * as S from "../styles/Login.style";

function LoginPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "아이디 또는 비밀번호가 올바르지 않습니다.") {
      navigate(`/login`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await postLogin(id, password);
      console.log("로그인 성공", data);
      setUser(data);
      navigate("/home");
    } catch (err) {
      console.error("로그인 실패", err);
      openModal("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <S.PageWrapper>
      <AuthForm
        title="로그인"
        fields={[
          {
            type: "text",
            placeholder: "학번/사번",
            value: id,
            onChange: (e) => setId(e.target.value),
          },
          {
            type: "password",
            placeholder: "비밀번호",
            value: password,
            onChange: (e) => setPassword(e.target.value),
          },
        ]}
        onSubmit={handleLogin}
        buttonText="로그인"
      />
      <S.Footer>
        <a href="/signup">회원 가입</a>
        <span>|</span>
        <a href="/forgotpasswd">비밀번호 찾기</a>
      </S.Footer>

      {modalVisible && (
        <S.ModalOverlay>
          <S.Modal>
            <p>{modalMessage}</p>
            <S.ModalCloseButton onClick={closeModal}>확인</S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
}

export default LoginPage;
