/* root-layout */
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/UserContext"; // 로그인 상태 가져옴
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
  // background-color: #f6fcdf;
`;

const RootLayout = () => {
  const { user } = useUser();
  const location = useLocation();

  const isAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  // 로그인 안 함
  if (!user && isAuthPage) {
    if (location.pathname === "/signup") return <SignupPage />;
    return <LoginPage />;
  }

  // 로그인된 경우
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default RootLayout;