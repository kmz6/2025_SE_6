import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import * as S from "../styles/SugangPage.style";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && !allowedRoles.includes(user.user_type)) {
      setShowModal(true);
    }
  }, [user, allowedRoles]);

  // 로딩 중일 땐 아무것도 보여주지 않음
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 로그인 안 된 경우
  if (!user) {
    return <navigate to="/" replace />;
  }

  // 권한 없는 경우
  if (showModal) {
    return (
      <S.ModalOverlay>
        <S.Modal>
          접근 권한이 없습니다.
          <div style={{ margin: "5px 0" }} />
          <S.ModalCloseButton
            onClick={() => {
              setShowModal(false);
              navigate(-1);
            }}
          >
            닫기
          </S.ModalCloseButton>
        </S.Modal>
      </S.ModalOverlay>
    );
  }

  return children;
};

export default ProtectedRoute;
