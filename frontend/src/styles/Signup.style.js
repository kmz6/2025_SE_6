import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
  background-color: #fff;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 700px;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

export const LabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
`;

export const Input = styled.input`
  flex: 1;
  height: auto;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  line-height: normal;
  box-sizing: border-box;
`;

export const Select = styled.select`
  flex: 1;
  height: auto;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  line-height: normal;
  box-sizing: border-box;
`;

export const Button = styled.button`
  height: 45px;
  background-color: #0078ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #005fd1;
  }
`;