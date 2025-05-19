import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  height: 60px;
  border: 1px solid #ddd;
  position: relative;
`;

const SubjectBlock = styled.div`
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

const Timetable = ({ subjects }) => {
  const days = ["월", "화", "수", "목", "금", "토"];
  const timeSlots = [1, 2, 3, 4, 5, 6, 7]; // 칸 수 조절 가능

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            {days.map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <Th>{time}</Th>
              {days.map((day) => {
                const subject = subjects.find(
                  (s) => s.day === day && s.time === time
                );
                return (
                  <Td key={day + time}>
                    {subject && (
                      <SubjectBlock color={subject.color}>
                        {subject.name}
                      </SubjectBlock>
                    )}
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Timetable;