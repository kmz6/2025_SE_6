import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
  background-color: #fff;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const Button = styled.button`
  height: 45px;
  background-color: #0078ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #005fd1;
  }
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
  return (
    <LoginContainer>
      <Logo src="../images/1506.png" alt="1506" />

      <LoginForm>
        <Input type="id" placeholder="학번/사번" />
        <Input type="password" placeholder="비밀번호" />
        <Button type="submit">로그인</Button>
      </LoginForm>

      <Footer>
        <a href="/signup">회원 가입</a>
        <span>|</span>
        <a href="#">비밀번호 찾기</a>
      </Footer>
    </LoginContainer>
  );
}

export default LoginPage;
