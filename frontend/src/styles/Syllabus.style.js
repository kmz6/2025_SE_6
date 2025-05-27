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
  margin-bottom: 70px;
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

export const FormBox = styled.div`
  margin-bottom: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  width: 100px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TwoColRow = styled.tr``;

export const TwoColHead = styled.td`
  padding: 12px;
  font-weight: bold;
  background-color: #f3f6f9;
  border: 1px solid #ccc;
  width: 15%;
`;

export const TwoColCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  width: 35%;
  word-break: break-word;
`;