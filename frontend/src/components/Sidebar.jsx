import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { routeMap } from "./menuRoutes";
import * as S from "../styles/Sidebar.style";

// 파라미터 치환
const replaceParams = (path, params) => {
  let replaced = path;
  Object.entries(params).forEach(([key, value]) => {
    replaced = replaced.replace(`:${key}`, value);
  });
  return replaced;
};

const Sidebar = () => {
  const { user } = useUser();
  const userType = user?.user_type || "student";
  const userId = user?.user_id || "defaultUserId";
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
      "학습 지원": ["강의 종합"],
      "대시 보드": [],
      마이페이지: ["내 정보 확인", "개인정보 수정", "비밀번호 변경"],
      "수강 신청": [],
    },
    faculty: {
      "강의 계획": ["출석 관리", "강의 계획서 작성"],
      강의실: [],
      "성적 처리": [],
      마이페이지: ["내 정보 확인", "개인정보 수정", "비밀번호 변경"],
    },
    staff: {
      "학적 관리": [],
      "구성원 관리": ["구성원 추가", "구성원 삭제"],
      마이페이지: ["내 정보 확인", "개인정보 수정", "비밀번호 변경"],
    },
  };

  const menuItems = menuMap[userType] || {};
  const userRoutes = routeMap[userType] || {};

  const externalLinks = [
    { label: "웹메일", url: "https://wmail.kw.ac.kr/" },
    { label: "중앙도서관", url: "https://kupis.kw.ac.kr/" },
  ];

  return (
    <S.SidebarContainer>
      {Object.entries(menuItems).map(([menuTitle, subItems]) => (
        <div key={menuTitle}>
          {/* 메뉴 타이틀 자체에 경로가 있으면 바로 navigate */}
          <S.MenuItem
            onClick={() => {
              let directRoute = userRoutes[menuTitle];
              if (directRoute) {
                directRoute = replaceParams(directRoute, {
                  userId: user?.user_id,
                });
                navigate(directRoute);
              } else {
                handleToggle(menuTitle);
              }
            }}
          >
            {menuTitle}
          </S.MenuItem>

          {/* 서브 메뉴 있는 경우에만 펼침 */}
          {openMenu === menuTitle &&
            subItems.length > 0 &&
            subItems.map((subItem) => (
              <S.SubMenuItem
                key={subItem}
                onClick={() => {
                  let route = userRoutes[subItem];
                  if (route) {
                    route = replaceParams(route, { userId: user?.user_id });
                    navigate(route);
                  }
                }}
              >
                {subItem}
              </S.SubMenuItem>
            ))}
        </div>
      ))}

      {externalLinks.map(({ label, url }) => (
        <S.ExternalLink
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </S.ExternalLink>
      ))}
    </S.SidebarContainer>
  );
};

export default Sidebar;
