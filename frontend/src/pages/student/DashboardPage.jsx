import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { assignmentData } from "../../mocks/assignmentData";
import * as S from "../../styles/DashboardPage.style";
import { examPeriods, festivalPeriod } from "../../constants/event";
import MemoModal from "../../components/Dashboard/MemoModal";
import LeftList from "../../components/Dashboard/LeftList";
import RightList from "../../components/Dashboard/RightList";
import { useUser } from "../../context/UserContext";

function isDateInRange(dateStr, start, end) {
  return dateStr >= start && dateStr <= end;
}

function getRandomBackgroundColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 90%)`;
}

function DashboardPage() {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const storageKey = user ? `memos_${user.user_id}` : null;

  useEffect(() => {
    if (!user) {
      setMemos([]);
      setIsLoading(false);
      return;
    }
    try {
      const savedMemos = localStorage.getItem(storageKey);
      if (savedMemos && savedMemos !== "undefined" && savedMemos !== "null") {
        const parsedMemos = JSON.parse(savedMemos);
        if (Array.isArray(parsedMemos)) setMemos(parsedMemos);
        else setMemos([]);
      } else setMemos([]);
    } catch {
      setMemos([]);
    } finally {
      setIsLoading(false);
    }
  }, [user, storageKey]);

  useEffect(() => {
    if (!isLoading && storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(memos));
      } catch {}
    }
  }, [memos, isLoading, storageKey]);

  const handleAddMemo = () => {
    if (!user) {
      return;
    }
    setShowMemoModal(true);
  };

  const handleSaveMemo = () => {
    if (!memoText.trim()) return;
    const newMemo = {
      id: Date.now(),
      userId: user.user_id,
      date: formattedDate,
      content: memoText,
      createdAt: new Date().toISOString(),
      backgroundColor: getRandomBackgroundColor(),
    };
    setMemos((prev) => [...prev, newMemo]);
    setMemoText("");
    setShowMemoModal(false);
  };

  const handleDeleteMemo = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  return (
    <S.Container>
      <LeftList
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        examPeriods={examPeriods}
        festivalPeriod={festivalPeriod}
        memos={memos}
        onDeleteMemo={handleDeleteMemo}
        onShowMemoModal={handleAddMemo}
        assignmentsDue={assignmentsDue}
      />

      <S.Right>
        <RightList
          assignments={assignmentsDue}
          isInExamPeriod={isInExamPeriod}
          isInFestivalPeriod={isInFestivalPeriod}
          date={formattedDate}
        />
      </S.Right>

      {showMemoModal && (
        <MemoModal
          date={formattedDate}
          memoText={memoText}
          setMemoText={setMemoText}
          onClose={() => setShowMemoModal(false)}
          onSave={handleSaveMemo}
        />
      )}
    </S.Container>
  );
}

export default DashboardPage;
