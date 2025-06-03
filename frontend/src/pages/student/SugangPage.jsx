import { useState, useEffect } from "react";
import * as S from "../../styles/SugangPage.style";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  searchCourses,
  registerCourse,
  deleteCourse,
  getRegisteredCourses,
} from "../../apis/sugang/sugang";
import { useUser } from "../../context/UserContext";

function SugangPage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const totalCredit = selected.reduce(
    (sum, course) => sum + (course.credit || 0),
    0
  );

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const results = await searchCourses("", user?.user_id);
        setAllCourses(results);
      } catch (err) {
        console.log("전체 과목 불러오기 실패");
      }
    };
    if (user) {
      fetchAllCourses();
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        try {
          const registered = await getRegisteredCourses(user.user_id);
          setSelected(registered);
        } catch (error) {
          console.log("아직 신청 과목x or 에러");
        }
      })();
    } else {
      setSelected([]);
    }
  }, [user, loading]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleApply = async (lecture) => {
    if (!user) return;
    const isConflict = selected.some((l) => {
      return l.course_times.some((lt) =>
        lecture.course_times.some(
          (t) =>
            t.course_day === lt.course_day &&
            t.course_period === lt.course_period
        )
      );
    });
    if (isConflict) {
      setShowModal(true);
    } else {
      try {
        await registerCourse({
          user_id: user.user_id,
          course_id: lecture.course_id,
        });
        setSelected([...selected, lecture]);
      } catch (err) {
        console.log("수강 신청 실패");
      }
    }
  };

  const handleDelete = async (courseId) => {
    if (!user) return;
    try {
      const data = {
        user_id: user.user_id,
        course_id: courseId,
      };
      await deleteCourse(data);
      setSelected(selected.filter((l) => l.course_id !== courseId));
    } catch (err) {
      console.log("수강 삭제 실패");
    }
  };

  const onSearchClick = async () => {
    if (!inputValue.trim()) return;
    setSearchTerm(inputValue.trim());
    try {
      if (!user) return;
      const results = await searchCourses(inputValue.trim(), user.user_id);
      setSearchResults(results);
    } catch (err) {
      console.log("검색 중 오류");
    }
  };

  const toggleFavorite = (courseId) => {
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter((id) => id !== courseId));
    } else {
      setFavorites([...favorites, courseId]);
    }
  };

  const displayedCourses = showFavoritesOnly
    ? allCourses.filter(
        (course) =>
          favorites.includes(course.course_id) &&
          !selected.some((sel) => sel.course_id === course.course_id)
      )
    : searchResults.filter(
        (course) => !selected.some((sel) => sel.course_id === course.course_id)
      );

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.Container>
      {showModal && (
        <S.ModalOverlay>
          <S.Modal>
            해당 시간에는 다른 강의가 있어 신청할 수 없습니다.
            <div style={{ margin: "5px 0" }} />
            다시 선택해주세요.
            <S.ModalCloseButton onClick={() => setShowModal(false)}>
              닫기
            </S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}

      <S.Left>
        <S.SearchWrapper>
          <FaSearch size={20} style={{ marginRight: 9 }} />
          <S.SearchInput
            type="text"
            placeholder="과목명 검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchClick();
            }}
          />
          <S.SearchButton onClick={onSearchClick}>검색</S.SearchButton>
          <S.FavoriteToggleButton
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? "해제" : "즐겨찾기"}
          </S.FavoriteToggleButton>
        </S.SearchWrapper>

        <S.SearchResults>
          {searchTerm === "" ? (
            <p>수강신청할 과목을 검색해주세요!</p>
          ) : displayedCourses.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            displayedCourses.map((course) => (
              <S.LectureCard key={course.course_id}>
                <S.LectureInfo>
                  <S.LectureTitleRow>
                    <S.FavoriteStar
                      isFavorite={favorites.includes(course.course_id)}
                      onClick={() => toggleFavorite(course.course_id)}
                    >
                      {favorites.includes(course.course_id) ? "★" : "☆"}
                    </S.FavoriteStar>
                    과목명: {course.course_name}
                  </S.LectureTitleRow>

                  <div>담당교수: {course.faculty_name || "정보 없음"}</div>
                  <div>
                    요일/시간:{" "}
                    {course.course_times && course.course_times.length > 0
                      ? course.course_times
                          .map((t) => `${t.course_day} ${t.course_period}교시`)
                          .join(", ")
                      : "시간 정보 없음"}
                  </div>
                  <div>
                    강의실: {course.building} {course.room}호
                  </div>
                </S.LectureInfo>
                <S.ApplyButton onClick={() => handleApply(course)}>
                  신청
                </S.ApplyButton>
              </S.LectureCard>
            ))
          )}
        </S.SearchResults>
      </S.Left>

      <S.Right>
        <S.RightHeader>
          <h3>신청한 과목</h3>
          <S.RightHeaderRight>
            <S.Credit>신청 학점: {totalCredit}학점</S.Credit>
            <S.TimetableButton onClick={() => navigate("/student/timetable")}>
              시간표 확인하기
            </S.TimetableButton>
          </S.RightHeaderRight>
        </S.RightHeader>
        <S.SelectedList>
          {selected.length === 0 && <p>신청한 과목이 없습니다.</p>}
          {selected.map((course) => (
            <S.LectureCard key={course.course_id}>
              <S.LectureInfo>
                <S.LectureTitleRow>
                  <S.FavoriteStar
                    isFavorite={favorites.includes(course.course_id)}
                    onClick={() => toggleFavorite(course.course_id)}
                  >
                    {favorites.includes(course.course_id) ? "★" : "☆"}
                  </S.FavoriteStar>
                  과목명: {course.course_name}
                </S.LectureTitleRow>

                <div>담당교수: {course.faculty_name || "정보 없음"}</div>
                <div>
                  요일/시간:{" "}
                  {course.course_times && course.course_times.length > 0
                    ? course.course_times
                        .map((t) => `${t.course_day} ${t.course_period}교시`)
                        .join(", ")
                    : "시간 정보 없음"}
                </div>
                <div>
                  강의실: {course.building} {course.room}호
                </div>
              </S.LectureInfo>
              <S.ApplyButton onClick={() => handleDelete(course.course_id)}>
                삭제
              </S.ApplyButton>
            </S.LectureCard>
          ))}
        </S.SelectedList>
      </S.Right>
    </S.Container>
  );
}

export default SugangPage;
