import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import * as S from "../../styles/Syllabus.style";
import { Button as CommonButton } from "../../styles/Syllabus.style";
import { getProfessorCourses } from "../../apis/syllabus/syllabus";

const ProfSyllabusListPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [myLectures, setMyLectures] = useState([]);
  const [filters] = useState({
    year: "2025",
    semester: "1",
  }); // 현재 학기에 맞춰 수정하면 됨

  useEffect(() => {
    if (user) {
      getProfessorCourses(user.user_id)
        .then((data) => setMyLectures(data))
        .catch((err) => console.error("강의 목록 불러오기 실패", err));
    }
  }, [user]);

  if (!user) return <Container>로딩 중...</Container>;

  const filteredLectures = myLectures.filter(
    (lec) =>
      lec &&
      lec.course_year?.toString() === filters.year &&
      lec.course_semester?.toString() === filters.semester
  );

  return (
    <S.Container>
      <S.Title>강의계획서 작성</S.Title>

      {filteredLectures.map((lec) => (
        <S.LectureCard key={lec.course_code}>
          <S.LectureName>{lec.course_name}</S.LectureName>
          <S.TimeText>강의코드: {lec.course_code}</S.TimeText>
          <CommonButton onClick={() => navigate(`${lec.course_code}`)}>
            작성
          </CommonButton>
        </S.LectureCard>
      ))}
    </S.Container>
  );
};
export default ProfSyllabusListPage;