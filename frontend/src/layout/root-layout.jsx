/* root-layout */
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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
  //   background-color: #f6fcdf;
`;

const RootLayout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Sidebar />
        <Content>
          <Outlet /> {}
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default RootLayout;
