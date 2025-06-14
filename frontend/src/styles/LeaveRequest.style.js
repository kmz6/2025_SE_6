import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";

export const Container = styled.div`
  margin: 24px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
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
  text-align: center;
`;

export const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  min-width: 100px;
  max-width: 200px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color : #003366;
  border-bottom: 1px solid #003366;
  border-bottom: 1px solid;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const LeaveButton = styled.button`
  padding: 10px 48px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0055aa;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ReturnButton = styled.button`
  padding: 10px 48px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0055aa;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const WarningMessage = styled.p`
  color: red;
  font-weight: bold;
  padding: 16px;
  background-color: #fff5f5;
  border: 1px solid #ffa8a8;
  border-radius: 8px;
`;

export const PendingWrapper = styled.div`
  position: relative;
  text-align: center;
`;

export const TrashIcon = styled(FaRegTrashAlt)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: gray;
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

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;