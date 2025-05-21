import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { userData, studentData, facultyData, staffData } from "../mocks/userData";

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
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // mock 로그인 체크
    if (id === userData.user_id && password === userData.password) {
      let detailedInfo = null;

      if (userData.user_type === "student") {
        detailedInfo = studentData;
      } else if (userData.user_type === "faculty") {
        detailedInfo = facultyData;
      } else if (userData.user_type === "staff") {
        detailedInfo = staffData;
      }

      const fullUser = {
        ...userData,
        ...detailedInfo,
      };
      console.log("🟢 로그인 성공! 저장할 user 정보:", fullUser);

      setUser(fullUser); // Context에 저장

      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <LoginContainer>
      <Logo src="../images/1506.png" alt="1506" />
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="학번/사번"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
