import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import AuthForm from "../components/AuthForm/AuthForm";
import { postLogin } from "../apis/auth/auth";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  a {
    color: #333;
    text-decoration: none;
    margin: 0 10px;
  }
`;

function LoginPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await postLogin(id, password);
      console.log("로그인 성공", data);
      setUser(data);
      navigate("/home");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <PageWrapper>
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
      <Footer>
        <a href="/signup">회원 가입</a>
        <span>|</span>
        <a href="/forgotpasswd">비밀번호 찾기</a>
      </Footer>
    </PageWrapper>
  );
}

export default LoginPage;
