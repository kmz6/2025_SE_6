import "react-calendar/dist/Calendar.css";
import * as S from "../../styles/DashboardPage.style";
import MemoCard from "./MemoCard";

export default function LeftList({
  selectedDate,
  setSelectedDate,
  examPeriods,
  festivalPeriod,
  memos,
  onDeleteMemo,
  onShowMemoModal,
  assignmentsDue,
}) {
  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const selectedDateMemos = memos.filter((memo) => memo.date === formattedDate);

  function isDateInRange(dateStr, start, end) {
    return dateStr >= start && dateStr <= end;
  }

  return (
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

          const hasAssignment = assignmentsDue?.some((a) => {
            if (!a.end_date) return false;
            const dueDateStr = a.end_date.slice(0, 10);
            return dueDateStr === dateStr;
          });

          const hasMemo = memos.some((memo) => memo.date === dateStr);

          return (
            <>
              {hasAssignment && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 17,
                    width: 9,
                    height: 9,
                    backgroundColor: "#21fc8f",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              )}
              {hasMemo && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 23,
                    right: 17,
                    width: 9,
                    height: 9,
                    backgroundColor: "rgb(174, 189, 206)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              )}
            </>
          );
        }}
      />

      <div
        style={{
          marginTop: 14,
          marginLeft: 8,
          display: "flex",
          gap: 18,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: "rgb(174, 189, 206)",
                borderRadius: "50%",
              }}
            />
            <span>메모</span>
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
        <S.AddMemoButton onClick={onShowMemoModal}>메모 추가</S.AddMemoButton>
      </div>

      <S.MemoSection>
        <h3>메모</h3>
        {selectedDateMemos.length === 0 ? (
          <p style={{ color: "#666", fontSize: "14px", marginTop: "2px" }}>
            선택한 날짜에 작성된 메모가 없습니다.
          </p>
        ) : (
          <S.MemoGrid>
            {selectedDateMemos.map((memo) => (
              <MemoCard key={memo.id} memo={memo} onDelete={onDeleteMemo} />
            ))}
          </S.MemoGrid>
        )}
      </S.MemoSection>
    </S.Left>
  );
}
