import styled from "styled-components";

export const Container = styled.div`
  margin: 24px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #003366;
  border-bottom: 1px solid #003366;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export const Row = styled.tr`
  border: 1px solid #ccc;
`;

export const CellHead = styled.td`
  width: 10%;
  padding: 15px;
  font-weight: bold;
  background-color: #f3f6f9;
  border: 1px solid #ccc;
`;

export const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

export const Button = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

export const OptionBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
  font-size: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  select {
    padding: 6px 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
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