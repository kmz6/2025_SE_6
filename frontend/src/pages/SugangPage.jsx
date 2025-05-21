import { useState } from "react";
import { courseData, facultyMap } from "../mocks/courseData";
import * as S from "./SugangPage.style";
import { FaSearch } from "react-icons/fa";

function SugangPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleApply = (lecture) => {
    const isConflict = selected.some((l) => {
      return l.time.some((lt) =>
        lecture.time.some(
          (t) =>
            t.course_day === lt.course_day &&
            t.course_period === lt.course_period
        )
      );
    });

    if (isConflict) {
      setShowModal(true);
    } else {
      setSelected([...selected, lecture]);
    }
  };

  const handleDelete = (id) => {
    setSelected(selected.filter((l) => l.course_id !== id));
  };

  const filteredCourses = courseData.filter(
    (l) =>
      l.course_name.includes(searchTerm) &&
      !selected.some((sel) => sel.course_id === l.course_id)
  );

  const onSearchClick = () => {
    setSearchTerm(inputValue.trim());
  };

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
              if (e.key === "Enter") {
                onSearchClick();
              }
            }}
          />
          <S.SearchButton onClick={onSearchClick}>검색</S.SearchButton>
        </S.SearchWrapper>
        <S.SearchResults>
          {searchTerm === "" ? (
            <p>수강신청할 과목을 검색해주세요!</p>
          ) : filteredCourses.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            filteredCourses.map((course) => (
              <S.LectureCard key={course.course_id}>
                <S.LectureInfo>
                  <div>과목명: {course.course_name}</div>
                  <div>담당교수: {facultyMap[course.faculty_id]}</div>
                  <div>
                    요일/시간:{" "}
                    {course.time
                      .map((t) => `${t.course_day} ${t.course_period}교시`)
                      .join(", ")}
                  </div>
                  <div>
                    강의실: {course.building_name} {course.room_number}호
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
        <h3>신청한 과목</h3>
        <S.SelectedList>
          {selected.length === 0 && <p>신청한 과목이 없습니다.</p>}
          {selected.map((course) => (
            <S.LectureCard key={course.course_id}>
              <S.LectureInfo>
                <div>과목명: {course.course_name}</div>
                <div>
                  요일/시간:{" "}
                  {course.time
                    .map((t) => `${t.course_day} ${t.course_period}교시`)
                    .join(", ")}
                </div>
                <div>
                  강의실: {course.building_name} {course.room_number}호
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
