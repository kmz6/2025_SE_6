import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 30px;
  height: calc(100vh - 120px); /* Navbar 높이 고려(60x2) */
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
`;

export const Left = styled.div`
  flex: 1;
  padding-right: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  p {
    margin-top: 30px;
    font-size: 18px;
    text-align: center;
    color: rgb(168, 168, 168);
  }
`;

export const Right = styled.div`
  flex: 1;
  border-left: 1px solid #ccc;
  padding-left: 18px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  h3 {
    font-size: 25px;
    margin-top: 9px;
    margin-bottom: 30px;
    flex-shrink: 0;
  }

  p {
    margin-top: 21px;
    font-size: 18px;
    text-align: center;
    color: rgb(168, 168, 168);
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 50px;
  flex-shrink: 0;
`;

export const SearchResults = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const SelectedList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px 11px;
  font-size: 17px;
`;

export const SearchButton = styled.button`
  margin-left: 8px;
  padding: 10px 16px;
  cursor: pointer;
  background-color: rgb(191, 191, 191);
  font-size: 14px;
  color: white;
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: rgb(168, 168, 168);
  }
`;

export const LectureCard = styled.div`
  border: 1px solid #ccc;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 22px;
  border-radius: 5px;
`;

export const LectureInfo = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-right: 16px;
  font-size: 14px;

  div:first-child {
    font-weight: bold;
    font-size: 18px;
  }
`;

export const ApplyButton = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 8px 0;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 39, 78);
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
