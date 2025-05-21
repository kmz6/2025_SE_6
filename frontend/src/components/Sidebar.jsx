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

const ExternalLink = styled.a`
  display: block;
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  text-decoration: none;

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
    "수강신청", // 추후 수정? (05.22)
  ];

  const externalLinks = [
    { label: "웹메일", url: "https://wmail.kw.ac.kr/" },
    { label: "중앙도서관", url: "https://reading.kw.ac.kr/" },
  ];

  return (
    <SidebarContainer>
      {menuItems.map((item) => (
        <MenuItem key={item}>{item}</MenuItem>
      ))}
      {externalLinks.map(({ label, url }) => (
        <ExternalLink
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </ExternalLink>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
