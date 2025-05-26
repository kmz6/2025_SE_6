import styled from "styled-components";
import Calendar from "react-calendar";

export const Container = styled.div`
  display: flex;
  padding: 30px;
  height: calc(100vh - 120px);
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

  h2 {
    font-size: 25px;
    margin-bottom: 30px;
  }
`;

export const Right = styled.div`
  flex: 1;
  padding-left: 18px;
  border-left: 1px solid #ccc;
  overflow-y: auto;

  h3 {
    font-size: 25px;
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

export const StyledCalendar = styled(Calendar)`
  width: 700px !important;
  max-width: 100%;
  font-size: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 30px 40px;
  background-color: #fff;
  user-select: none;
  color: #1c1c1e;

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
    background: rgb(236, 250, 230);
    color: #2a7a0a;
    font-weight: 700;
    border-radius: 14px;
  }

  .react-calendar__tile--active {
    background: rgb(148, 200, 252);
    color: white;
    font-weight: 700;
    border-radius: 14px;
    box-shadow: 0 0 8px rgba(148, 200, 252, 0.6);
  }
`;
