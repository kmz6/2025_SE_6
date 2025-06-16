import styled from "styled-components";

export const Nav = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
`;

export const Left = styled.div`
  font-weight: bold;
  color: #555;
`;

export const Center = styled.img`
  height: 40px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  margin-left: 95px;
  transform: translateX(-50%);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }
`;

export const Right = styled.div`
  color: #1a73e8;
  font-size: 14px;
  white-space: nowrap;

  span {
    margin-right: 12px;
    font-weight: 500;
  }

  button {
    background: none;
    border: none;
    color: #1a73e8;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
  }
`;