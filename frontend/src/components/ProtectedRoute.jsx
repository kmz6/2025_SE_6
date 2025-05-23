import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useUser();

  // 🔄 로딩 중일 땐 아무것도 보여주지 않음 (또는 로딩 스피너)
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // ❌ 로그인 안 된 경우
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ❌ 권한 없는 경우
  if (!allowedRoles.includes(user.user_type)) {
    return <div>접근 권한이 없습니다.</div>;
  }

  // ✅ 통과
  return children;
};

export default ProtectedRoute;