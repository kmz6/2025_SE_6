import { useState, useEffect } from "react";
import {
  searchCourses,
  registerCourse,
  deleteCourse,
  getRegisteredCourses,
} from "../../apis/sugang/sugang";
import useFavorites from "./useFavorites";

function useCourseManagement(user, loading) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites(user?.user_id);
  const [inputValue, setInputValue] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const totalCredit = selected
    .filter(
      (course) => course.course_year === 2025 && course.course_semester === 1
    )
    .reduce((sum, course) => sum + (course.credit || 0), 0);

  useEffect(() => {
    if (!user) return;
    const fetchAllCourses = async () => {
      try {
        const results = await searchCourses("", user.user_id);
        setAllCourses(results);
      } catch (err) {
        console.log("전체 과목 불러오기 실패");
      }
    };
    fetchAllCourses();
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        try {
          const registered = await getRegisteredCourses(user.user_id);
          setSelected(registered);
        } catch {
          console.log("아직 신청 과목x or 에러");
        }
      })();
    } else {
      setSelected([]);
    }
  }, [user, loading]);

  const handleApply = async (lecture) => {
    if (!user) return;

    const isConflict = selected
      .filter((l) => l.course_year === 2025 && l.course_semester === 1)
      .some((l) =>
        l.course_times.some((lt) =>
          lecture.course_times.some(
            (t) =>
              t.course_day === lt.course_day &&
              t.course_period === lt.course_period
          )
        )
      );

    if (isConflict) {
      setModalMessage("해당 시간에는 다른 강의가 있어 신청할 수 없습니다.");
      setShowModal(true);
      return;
    }

    const creditAfterAdd = totalCredit + (lecture.credit || 0);
    if (creditAfterAdd > 19) {
      setModalMessage("신청할 수 있는 학점(19학점)을 초과하였습니다.");
      setShowModal(true);
      return;
    }

    try {
      await registerCourse({
        user_id: user.user_id,
        course_id: lecture.course_id,
      });
      setSelected([...selected, lecture]);
    } catch {
      console.log("수강 신청 실패");
    }
  };

  const handleDelete = async (courseId) => {
    if (!user) return;
    try {
      await deleteCourse({ user_id: user.user_id, course_id: courseId });
      setSelected(selected.filter((l) => l.course_id !== courseId));
    } catch {
      console.log("수강 삭제 실패");
    }
  };

  const onSearchClick = async () => {
    if (!inputValue.trim() || !user) return;
    const term = inputValue.trim();
    setSearchTerm(term);
    try {
      const results = await searchCourses(term, user.user_id);
      setSearchResults(results);
    } catch {
      console.log("검색 중 오류");
    }
  };

  const displayedCourses = (
    showFavoritesOnly
      ? allCourses.filter((course) => isFavorite(course.course_id))
      : searchTerm
      ? searchResults
      : allCourses
  ).filter(
    (course) =>
      course.course_year === 2025 &&
      course.course_semester === 1 &&
      !selected.some((sel) => sel.course_id === course.course_id)
  );

  return {
    inputValue,
    setInputValue,
    onSearchClick,
    searchTerm,
    displayedCourses,
    selected,
    handleApply,
    handleDelete,
    showModal,
    modalMessage,
    setShowModal,
    totalCredit,
    isFavorite,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  };
}

export default useCourseManagement;
