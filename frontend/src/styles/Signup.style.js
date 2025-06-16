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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: #f2f2f2;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  padding: 24px 16px 0;
  font-size: 18px;
  font-weight: 500;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px 0;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #f2f2f2;
  font-size: 17px;
  color: #003366;
  font-weight: 600;
  cursor: pointer;
`;