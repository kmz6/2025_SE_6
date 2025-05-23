import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { routeMap } from "./menuRoutes";

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
  padding-top: 20px;
  font-family: sans-serif;
`;

const MenuItem = styled.div`
  padding: 12px 20px;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const SubMenuItem = styled.div`
  padding: 10px 30px;
  font-size: 14px;
  color: #555;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const ExternalLink = styled.a`
  display: block;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const Sidebar = () => {
  const { user } = useUser();
  const userType = user?.user_type || "student";
  const navigate = useNavigate();

  // 클릭된 메뉴 상태
  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // 메뉴 구조 정의
  const menuMap = {
    student: {
      "수강 관리": ["시간표", "출석 관리", "강의 계획서 조회"],
      "학습 결과": ["수강/성적 조회", "석차 조회"],
      "학적 관리": ["휴복학 신청"],
      "학습 지원": ["강의 종합", "온라인 강의 콘텐츠 시청", "공지사항", "강의 자료실", "과제 제출"],
      "대시 보드": [],
      "마이 페이지": [],
      "수강 신청": [],
    },
    faculty: {
      "수강 관리": ["출석 관리", "강의 계획서 작성"],
      "학습 결과": ["성적 입력"],
      "학습 지원": ["온라인 강의 콘텐츠 업로드", "공지사항 업로드", "자료실 업로드", "제출된 과제 확인"],
    },
    staff: {
      "학적 관리": [],
      "구성원 관리": ["구성원 추가"],
    },
  };

  const menuItems = menuMap[userType] || {};
  const userRoutes = routeMap[userType] || {};

  const externalLinks = [
    { label: "웹메일", url: "https://wmail.kw.ac.kr/" },
    { label: "중앙도서관", url: "https://reading.kw.ac.kr/" },
  ];

  return (
    <SidebarContainer>
      {Object.entries(menuItems).map(([menuTitle, subItems]) => (
        <div key={menuTitle}>
          {/* 메뉴 타이틀 자체에 경로가 있으면 바로 navigate */}
          <MenuItem
            onClick={() => {
              const directRoute = userRoutes[menuTitle];
              if (directRoute) {
                navigate(directRoute); // 서브 메뉴 없이 바로 이동
              } else {
                handleToggle(menuTitle); // 서브 메뉴 열기/닫기
              }
            }}
          >
            {menuTitle}
          </MenuItem>

          {/* 서브 메뉴 있는 경우에만 펼침 */}
          {openMenu === menuTitle && subItems.length > 0 &&
            subItems.map((subItem) => (
              <SubMenuItem
                key={subItem}
                onClick={() => {
                  const route = userRoutes[subItem];
                  if (route) navigate(route);
                }}
              >
                {subItem}
              </SubMenuItem>
            ))}
        </div>
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