import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/Timetable.style";

const Timetable = ({ subjects }) => {
  const navigate = useNavigate();
  const days = ["월", "화", "수", "목", "금", "토"];
  const timeSlots = [1, 2, 3, 4, 5, 6, 7];

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          <tr>
            <S.Th></S.Th>
            {days.map((day) => (
              <S.Th key={day}>{day}</S.Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <S.Th>{time}</S.Th>
              {days.map((day) => {
                const subject = subjects.find(
                  (s) => s.day === day && s.time === time
                );
                return (
                  <S.Td key={day + time}>
                    {subject && (
                      <S.SubjectBlock
                        color={subject.color}
                        onClick={() =>
                          navigate(`/lectureroom/${subject.lectureId}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {subject.name}
                      </S.SubjectBlock>
                    )}
                  </S.Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default Timetable;