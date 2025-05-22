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
  padding: 15px;
  font-weight: bold;
  background-color: #f3f6f9;
  border: 1px solid #ccc;
`;

export const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
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

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SortContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SortLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

export const SortSelect = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
`;

export const GradeInput = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  padding: 2px;
  font-size: inherit;
`;