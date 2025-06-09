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
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
`;