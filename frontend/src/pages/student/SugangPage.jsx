import { useState, useEffect } from "react";
import * as S from "../../styles/SugangPage.style";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useCourseManagement from "../../hooks/Sugang/useCourseManagement";

function SugangPage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const {
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
  } = useCourseManagement(user, loading);

  if (loading) return <p>로딩 중...</p>;

  return (
    <S.Container>
      {showModal && (
        <S.ModalOverlay>
          <S.Modal>
            {modalMessage}
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
            onKeyDown={(e) => e.key === "Enter" && onSearchClick()}
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
                      isFavorite={isFavorite(course.course_id)}
                      onClick={() => toggleFavorite(course.course_id)}
                    >
                      {isFavorite(course.course_id) ? "★" : "☆"}
                    </S.FavoriteStar>
                    과목명: {course.course_name}
                  </S.LectureTitleRow>
                  <div>담당교수: {course.faculty_name || "정보 없음"}</div>
                  <div>
                    요일/시간:{" "}
                    {course.course_times?.length > 0
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
          {selected.filter(
            (course) =>
              course.course_year === 2025 && course.course_semester === 1
          ).length === 0 && <p>신청한 과목이 없습니다.</p>}

          {selected
            .filter(
              (course) =>
                course.course_year === 2025 && course.course_semester === 1
            )
            .map((course) => (
              <S.LectureCard key={course.course_id}>
                <S.LectureInfo>
                  <S.LectureTitleRow>
                    <S.FavoriteStar
                      isFavorite={isFavorite(course.course_id)}
                      onClick={() => toggleFavorite(course.course_id)}
                    >
                      {isFavorite(course.course_id) ? "★" : "☆"}
                    </S.FavoriteStar>
                    과목명: {course.course_name}
                  </S.LectureTitleRow>
                  <div>담당교수: {course.faculty_name || "정보 없음"}</div>
                  <div>
                    요일/시간:{" "}
                    {course.course_times?.length > 0
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
