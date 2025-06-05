import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const Th = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
  border: 1px solid #ddd;
`;

export const Td = styled.td`
  height: 50px;
  border: 1px solid #ddd;
  position: relative;
`;

export const SubjectBlock = styled.div`
  background-color: ${(props) => props.color || "#d0e8ff"};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
`;