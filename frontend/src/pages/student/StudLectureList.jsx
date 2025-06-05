import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getStudentLectures } from "../../apis/attendance/attendance";
import * as S from "../../styles/LectureList.style";

const StudentLectureList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [myLectures, setMyLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      if (user) {
        const data = await getStudentLectures(user.user_id);
        const filtered = data.filter((lec) => lec.semester === "25-1");
        console.log(filtered);
        setMyLectures(filtered);
      }
    };
    fetchLectures();
  }, [user]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <S.Container>
      <S.Title>수강 강의 목록</S.Title>
      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>강의명</S.CellHead>
            <S.CellHead>강의시간</S.CellHead>
          </S.Row>
        </thead>
        <tbody>
          {myLectures.map((lec) => (
            <S.Row
              key={lec.course_id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/student/attendance/${lec.course_id}`)}
            >
              <S.Cell>{lec.course_name}</S.Cell>
              <S.Cell>{lec.course_times || "시간 미등록"}</S.Cell>
            </S.Row>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default StudentLectureList;