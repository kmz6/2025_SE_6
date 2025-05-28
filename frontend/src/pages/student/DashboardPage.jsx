import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { assignmentData } from "../../mocks/assignmentData";
import * as S from "../../styles/DashboardPage.style";
import { examPeriods, festivalPeriod } from "../../constants/event";

function isDateInRange(dateStr, start, end) {
  return dateStr >= start && dateStr <= end;
}

function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const assignmentsDue = assignmentData.filter(
    (a) => a.dueDate === formattedDate
  );

  const isInExamPeriod = examPeriods.some((period) =>
    isDateInRange(formattedDate, period.start, period.end)
  );
  const isInFestivalPeriod = isDateInRange(
    formattedDate,
    festivalPeriod.start,
    festivalPeriod.end
  );

  return (
    <S.Container>
      <S.Left>
        <h2>월간 일정</h2>
        <S.StyledCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="ko-KR"
          tileClassName={({ date, view }) => {
            if (view !== "month") return "";

            const dateStr = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            const isExamWeek = examPeriods.some((period) =>
              isDateInRange(dateStr, period.start, period.end)
            );

            const isFestivalWeek = isDateInRange(
              dateStr,
              festivalPeriod.start,
              festivalPeriod.end
            );

            if (isExamWeek) return "exam-underline";
            if (isFestivalWeek) return "festival-underline";
            return "";
          }}
          tileContent={({ date, view }) => {
            if (view !== "month") return null;

            const dateStr = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            const hasAssignment = assignmentData.some(
              (a) => a.dueDate === dateStr
            );

            return hasAssignment ? (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 19,
                  width: 9,
                  height: 9,
                  backgroundColor: "#21fc8f",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />
            ) : null;
          }}
        />

        <div
          style={{
            marginTop: 20,
            marginLeft: 8,
            display: "flex",
            gap: 18,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#21fc8f",
                borderRadius: "50%",
              }}
            />
            <span>과제 마감일</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 4,
                backgroundColor: "#ffeb3b",
                borderRadius: 2,
              }}
            />
            <span>시험기간</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 16,
                height: 4,
                backgroundColor: "#b71c1c",
                borderRadius: 2,
              }}
            />
            <span>축제기간</span>
          </div>
        </div>
      </S.Left>

      <S.Right>
        <h3>{formattedDate}</h3>
        {isInExamPeriod && (
          <S.ExamNotice>
            <span>기말고사 시험기간</span>
          </S.ExamNotice>
        )}
        {isInFestivalPeriod && (
          <S.FestivalNotice>
            <span>학교 축제기간</span>
          </S.FestivalNotice>
        )}

        {assignmentsDue.length === 0 &&
        !isInExamPeriod &&
        !isInFestivalPeriod ? (
          <p>해당 날짜에 일정이 없습니다.</p>
        ) : (
          assignmentsDue.map((a) => (
            <S.AssignmentCard
              key={a.id}
              onClick={() => navigate(`/assignments/${a.id}`)}
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
