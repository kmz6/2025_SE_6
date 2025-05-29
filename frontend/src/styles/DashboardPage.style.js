import styled from "styled-components";
import Calendar from "react-calendar";

export const Container = styled.div`
  display: flex;
  padding: 30px;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  width: 100%;
`;

export const Left = styled.div`
  flex: 1;
  padding-right: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 25px;
    margin-bottom: 18px;
  }
`;

export const Right = styled.div`
  flex: 1;
  padding-left: 18px;
  border-left: 1px solid #ccc;
  overflow-y: auto;

  h3 {
    font-size: 25px;
    margin-bottom: 18px;
    flex-shrink: 0;
  }

  p {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    color: rgb(168, 168, 168);
  }
`;

export const AssignmentCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #e6f0ff;
    transform: translateY(-2px);
  }
`;

export const Subject = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 6px;
`;

export const Title = styled.div`
  font-size: 17px;
  font-weight: 400;
`;

export const DateRange = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #777;
`;

export const ExamNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #444;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 16px;
  position: relative;
  padding-left: 0;

  &::before {
    content: "★";
    color: rgb(250, 240, 152);
    font-size: 25px;
    flex-shrink: 0;
  }

  & > span {
    background: linear-gradient(
      to top,
      rgb(252, 244, 175) 120%,
      transparent 50%
    );
    display: inline;
    padding: 0 5px;
    margin: 0 -4px;
  }
`;

export const FestivalNotice = styled(ExamNotice)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #444;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 16px;
  position: relative;
  padding-left: 0;

  &::before {
    content: "🔥";
    color: #b71c1c;
    font-size: 25px;
    flex-shrink: 0;
  }

  & > span {
    background: linear-gradient(
      to top,
      rgb(255, 198, 204) 120%,
      transparent 50%
    );
    display: inline;
    padding: 0 5px;
    margin: 0 -4px;
  }
`;

export const HighlightedDate = styled.span`
  position: relative;
  z-index: 1;
  display: inline-block;
  font-weight: 600;
  padding: 0 5px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.15em;
    height: 0.6em;
    background-color: #3f51b5;
    background: linear-gradient(to top, #3f51b5 120%, transparent 50%);
    opacity: 0.25;
    z-index: -1;
  }
`;

export const StyledCalendar = styled(Calendar)`
  width: 700px !important;
  max-width: 100%;
  font-size: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 20px 30px;
  background-color: #fff;
  user-select: none;
  color: #1c1c1e;
  overflow: hidden;

  .react-calendar__viewContainer {
    overflow: hidden;
  }

  .react-calendar__month-view {
    overflow: hidden;
  }

  .react-calendar__month-view__days {
    overflow: hidden;
  }

  .react-calendar__tile {
    overflow: hidden;
    position: relative;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .react-calendar__navigation__arrow {
    color: rgb(79, 79, 79);
    cursor: pointer;
    font-size: 28px;
    transition: color 0.3s ease;
    user-select: none;
  }

  .react-calendar__navigation__arrow:hover {
    color: rgb(79, 79, 79);
  }

  .react-calendar__navigation__label {
    font-size: 22px;
    font-weight: 600;
    color: #1c1c1e;
    user-select: none;
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .react-calendar__month-view__weekdays__weekday {
    font-weight: 600;
    color: #333;
    font-size: 15px;
    text-align: center;
    flex-basis: 14.28%;
  }

  .react-calendar__tile {
    padding: 14px 0;
    font-size: 17px;
    border-radius: 14px;
    transition: background-color 0.2s ease, transform 0.1s ease;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__tile:hover {
    background: #e6f0ff;
    transform: scale(1.05);
  }

  .react-calendar__tile--now {
    background: rgb(251, 243, 243);
    color: rgb(97, 97, 97);
    font-weight: 700;
    border-radius: 14px;
  }

  .react-calendar__tile--active {
    background: rgb(209, 231, 253);
    color: white;
    font-weight: 700;
    border-radius: 14px;
  }

  .react-calendar__tile.exam-underline {
    text-decoration: underline;
    text-decoration-color: #ffeb3b;
    text-decoration-thickness: 3px;
    text-underline-offset: 3px;
  }

  .react-calendar__tile.festival-underline {
    text-decoration: underline;
    text-decoration-color: rgb(254, 30, 14);
    text-decoration-thickness: 3px;
    text-underline-offset: 3px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
  font-size: 19px;
  font-weight: 600;
  position: relative;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
`;

export const MemoTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: rgb(174, 189, 206);
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #f2f2f2;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;

  &:first-child {
    color: #666;
    border-right: 1px solid #ccc;
  }

  &:last-child {
    color: #003366;
  }
`;

export const AddMemoButton = styled.button`
  padding: 10px 15px;
  background-color: rgb(174, 189, 206);
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  overflow-y: hidden;

  &:hover {
    background-color: rgb(120, 131, 146);
  }
`;

export const MemoSection = styled.div`
  margin-top: 12px;
  margin-left: 8px;
`;

export const MemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 4px;
`;

export const MemoCard = styled.div`
  background-color: ${(props) => props.backgroundColor || "rgb(253, 251, 222)"};
  width: 200px;
  height: 170px;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 8px;
  position: relative;
  overflow-y: hidden;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MemoDate = styled.div`
  font-size: 10px;
  color: #666;
  margin-bottom: 10px;
`;

export const MemoContent = styled.div`
  font-size: 15px;
  white-space: pre-wrap;
  color: #333;
`;

export const MemoDeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  border: none;
  font-size: 22px;
  color: rgb(237, 125, 155);
  cursor: pointer;
`;
