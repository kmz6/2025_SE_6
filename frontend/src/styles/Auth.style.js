import styled from "styled-components";

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

export const Button = styled.button`
  height: 45px;
  background-color: #0078ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 0px;

  &:hover {
    background-color: #005fd1;
  }
`;