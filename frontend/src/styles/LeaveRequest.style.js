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
  background: rgb(31, 31, 31);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ReturnButton = styled.button`
  padding: 10px 48px;
  background:rgb(31, 31, 31);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

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