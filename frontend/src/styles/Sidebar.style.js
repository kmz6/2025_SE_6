import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
  padding-top: 20px;
  font-family: sans-serif;
`;

export const MenuItem = styled.div`
  padding: 12px 20px;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

export const SubMenuItem = styled.div`
  padding: 10px 30px;
  font-size: 14px;
  color: #555;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const ExternalLink = styled.a`
  display: block;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #e6e6e6;
  }
`;