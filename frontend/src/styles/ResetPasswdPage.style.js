import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: #f2f2f2;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  padding: 24px 16px 0;
  font-size: 18px;
  font-weight: 500;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px 0;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #f2f2f2;
  font-size: 17px;
  color: #003366;
  font-weight: 600;
  cursor: pointer;
`;