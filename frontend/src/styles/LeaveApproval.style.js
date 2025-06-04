import styled from "styled-components";

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

export const ApproveButton = styled.button`
  padding: 6px 14px;
  background: rgb(79, 76, 175);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgb(60, 57, 140);
  }
`;

export const RejectButton = styled.button`
  padding: 6px 14px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #d32f2f;
  }
`;

export const Pending = styled.span`
  display: inline-block;
  transition: opacity 0.2s ease;
`;

export const ButtonWrapper = styled.div`
  display: none;
  gap: 8px;
  margin-left: 8px;
`;

export const StatusWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;

  &:hover ${Pending} {
    display: none;
  }

  &:hover ${ButtonWrapper} {
    display: flex;
  }
`;