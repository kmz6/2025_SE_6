import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "../styles/Navbar.style";

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
    <S.Nav>
      <S.Left>메뉴</S.Left>
      <S.Center src="/images/kw_eng.svg" alt="로고" onClick={() => navigate("/")} />
      <S.Right>
        {user ? (
          <>
            <span>{user.name}({user.user_id})</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <a href="/login">로그인</a>
        )}
      </S.Right>
    </S.Nav>
  );
};

export default Navbar;