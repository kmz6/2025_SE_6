import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 24px auto;
`;

export const FieldGroup = styled.div`
  margin-bottom: 50px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 19px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 6px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 120px;
`;

export const ConfirmButton = styled.button`
  padding: 13px 33px;
  background-color: #d61c4e;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(226, 48, 96);
  }
`;

export const CancelButton = styled.button`
  padding: 13px 33px;
  background-color: #003366;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;
