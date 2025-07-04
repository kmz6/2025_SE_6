import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import * as S from "../../styles/DashboardPage.style";
import { examPeriods, festivalPeriod } from "../../constants/event";
import MemoModal from "../../components/Dashboard/MemoModal";
import LeftList from "../../components/Dashboard/LeftList";
import RightList from "../../components/Dashboard/RightList";
import { useUser } from "../../context/UserContext";
import { getDashboard } from "../../apis/dashboard/dashboard";
import {
  parseDateString,
  addOneDay,
  formatDate,
  isDateInRange,
  getRandomBackgroundColor,
} from "../../utils/date";
import useSelectedDate from "../../hooks/Dashboard/useSelectedDate";

function DashboardPage() {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useSelectedDate(user);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [memos, setMemos] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
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

  useEffect(() => {
    if (!user) return;

    const fetchAssignments = async () => {
      try {
        const data = await getDashboard(user.user_id);
        const fixedData = data.map((item) => ({
          ...item,
          start_date: formatDate(addOneDay(item.start_date.slice(0, 10))),
          end_date: formatDate(addOneDay(item.end_date.slice(0, 10))),
        }));
        setAssignments(fixedData);
        console.log(fixedData);
      } catch (error) {
        console.log("데이터 가져오기 실패");
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [user]);

  const handleAddMemo = () => {
    if (!user) return;
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
        assignmentsDue={assignments}
      />

      <S.Right>
        <RightList
          assignments={assignments}
          isInExamPeriod={isInExamPeriod}
          isInFestivalPeriod={isInFestivalPeriod}
          date={formattedDate}
          selectedDate={selectedDate}
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
