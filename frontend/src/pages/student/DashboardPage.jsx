import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { assignmentData } from "../../mocks/assignmentData";
import * as S from "../../styles/DashboardPage.style";
import { examPeriods, festivalPeriod } from "../../constants/event";

function isDateInRange(dateStr, start, end) {
  return dateStr >= start && dateStr <= end;
}

function getRandomBackgroundColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 90%)`;
}

function DashboardPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [memos, setMemos] = useState([]);

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

  const handleAddMemo = () => {
    if (memoText.trim()) {
      const newMemo = {
        id: Date.now(),
        date: formattedDate,
        content: memoText.trim(),
        createdAt: new Date().toLocaleString("ko-KR"),
        backgroundColor: getRandomBackgroundColor(),
      };
      setMemos([newMemo, ...memos]);
      setMemoText("");
      setShowMemoModal(false);
    }
  };

  const handleDeleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const selectedDateMemos = memos.filter((memo) => memo.date === formattedDate);

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
          <S.AddMemoButton onClick={() => setShowMemoModal(true)}>
            메모 추가
          </S.AddMemoButton>
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
                <S.MemoCard
                  key={memo.id}
                  backgroundColor={memo.backgroundColor}
                >
                  <S.MemoDeleteButton onClick={() => handleDeleteMemo(memo.id)}>
                    ×
                  </S.MemoDeleteButton>
                  <S.MemoDate>{memo.createdAt}</S.MemoDate>
                  <S.MemoContent>{memo.content}</S.MemoContent>
                </S.MemoCard>
              ))}
            </S.MemoGrid>
          )}
        </S.MemoSection>
      </S.Left>

      <S.Right>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>
            <S.HighlightedDate>{formattedDate}</S.HighlightedDate>
          </h3>
        </div>
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

      {showMemoModal && (
        <S.ModalOverlay onClick={() => setShowMemoModal(false)}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalTitle>{formattedDate} 메모 작성</S.ModalTitle>
            <S.MemoTextarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              placeholder="메모를 입력하세요."
              autoFocus
            />
            <S.ModalButtonContainer>
              <S.ModalButton
                onClick={() => {
                  setMemoText("");
                  setShowMemoModal(false);
                }}
              >
                취소
              </S.ModalButton>
              <S.ModalButton onClick={handleAddMemo}>저장</S.ModalButton>
            </S.ModalButtonContainer>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}

export default DashboardPage;
