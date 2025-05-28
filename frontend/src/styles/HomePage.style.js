import styled from "styled-components";

export const HomeWrapper = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 25px;
  text-align: center;
`;

export const CourseRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
`;

export const CourseName = styled.div`
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: ${(props) => props.bg || "#ccc"};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  position: relative;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;