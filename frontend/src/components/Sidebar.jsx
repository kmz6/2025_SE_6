import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 150px;
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
  padding-top: 20px;
  font-family: sans-serif;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const Sidebar = () => {
  const menuItems = [
    "수강관리",
    "학습성과",
    "학적관리",
    "학사지원",
    "대시보드",
    "마이페이지",
  ];

  return (
    <SidebarContainer>
      {menuItems.map((item) => (
        <MenuItem key={item}>{item}</MenuItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
