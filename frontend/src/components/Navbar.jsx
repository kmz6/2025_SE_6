import React from "react";
import styled from "styled-components";

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

  a {
    text-decoration: none;
    color: #1a73e8;
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Left>메뉴</Left>
      <Right>
        <span>농담곰(2022202063)</span>
        <a href="/login">로그아웃</a> {/* 나중에 Link로 바꾸면 됨 */}
      </Right>
    </Nav>
  );
};

export default Navbar;
