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
`;

export const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  min-width: 100px;
  max-width: 200px;
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

export const WarningMessage = styled.p`
  color: red;
  font-weight: bold;
  padding: 16px;
  background-color: #fff5f5;
  border: 1px solid #ffa8a8;
  border-radius: 8px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const SelectLabel = styled.label`
  font-weight: 600;
  color: #333;
    margin-right: 12px;
`;

export const Select = styled.select`
  padding: 4px 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
`;

export const ChartWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;