import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
`;

export const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  a {
    color: #333;
    text-decoration: none;
    margin: 0 10px;
  }
`;