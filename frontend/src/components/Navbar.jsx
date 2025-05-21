import React from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Nav = styled.div`
  height: 60px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  font-family: sans-serif;
`;

const Left = styled.div`
  font-weight: bold;
  color: #555;
`;

const Right = styled.div`
  color: #1a73e8;
  font-size: 14px;

  span {
    margin-right: 12px;
    font-weight: 500;
  }

  button {
    background: none;
    border: none;
    color: #1a73e8;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
  }
`;

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // 로그인 상태 해제
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <Nav>
      <Left>메뉴</Left>
      <Right>
        {user ? (
          <>
            <span>{user.name}({user.user_id})</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <a href="/login">로그인</a>
        )}
      </Right>
    </Nav>
  );
};

export default Navbar;