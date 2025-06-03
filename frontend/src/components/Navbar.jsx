import React from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Nav = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
  font-family: sans-serif;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
`;

const Left = styled.div`
  font-weight: bold;
  color: #555;
`;

const Center = styled.img`
  height: 40px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }
`;

const Right = styled.div`
  color: #1a73e8;
  font-size: 14px;
  white-space: nowrap;

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
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    console.log("user 변경됨 → 현재 상태:", user);
  }, [user]);

  return (
    <Nav>
      <Left>메뉴</Left>
      <Center src="/images/1506.png" alt="로고" onClick={() => navigate("/")} />
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