import styled from "styled-components";

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