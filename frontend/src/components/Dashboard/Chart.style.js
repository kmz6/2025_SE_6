import styled from "styled-components";

export const BarContainer = styled.div`
  width: 100%;
  max-width: 300px;
  background: #f2f2f7;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const BarTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const BarLabel = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #3c3c4399;
`;

export const BarBackground = styled.div`
  background: #d1d1d6;
  border-radius: 12px;
  height: 8px;
  position: relative;
  overflow: hidden;
  flex: 1;
  margin-left: 8px;
`;

export const BarFill = styled.div`
  background: #0a84ff;
  height: 100%;
  border-radius: 12px 0 0 12px;
  width: ${(props) => props.width}%;
  transition: width 0.5s ease;
`;

export const PercentLabel = styled.div`
  margin-top: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #3c3c43;
  text-align: right;
`;
