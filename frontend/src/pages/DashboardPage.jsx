import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { assignmentData } from "../mocks/assignmentData";
import * as S from "./DashboardPage.style";

function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const assignmentsDue = assignmentData.filter(
    (a) => a.dueDate === formattedDate
  );

  return (
    <S.Container>
      <S.Left>
        <h2>월간 일정</h2>
        <S.StyledCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="ko-KR"
        />
      </S.Left>

      <S.Right>
        <h3>{formattedDate}</h3>
        {assignmentsDue.length === 0 ? (
          <p>해당 날짜에 일정이 없습니다.</p>
        ) : (
          assignmentsDue.map((a) => (
            <S.AssignmentCard
              key={a.id}
              onClick={() => navigate(`/${a.subject}/assignments/${a.id}`)}
            >
              <S.Subject>{a.subject}</S.Subject>
              <S.Title>{a.title}</S.Title>
              <S.DateRange>
                {a.startDate} ~ {a.dueDate}
              </S.DateRange>
            </S.AssignmentCard>
          ))
        )}
      </S.Right>
    </S.Container>
  );
}

export default DashboardPage;
