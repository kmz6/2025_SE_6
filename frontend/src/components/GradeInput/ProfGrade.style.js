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

export const SelectContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

export const Select = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 16px;
`;

export const GradeInputWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

export const GradeInput = styled.input`
    width: 100%;
    padding: 6px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
        outline: none;
        border-color: #4a90e2;
    }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const CheckButton = styled.button`
  padding: 10px 48px;
  background: rgb(31, 31, 31);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  background-color: rgba(50, 50, 50, 0.85); // 진회색 배경
  border-color: rgba(50, 50, 50, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0.9;
  pointer-events: none;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 10px;
    border-width: 6px 6px 0 6px;
    border-style: solid;
    border-color: rgba(50, 50, 50, 0.85) transparent transparent transparent;
  }
`;