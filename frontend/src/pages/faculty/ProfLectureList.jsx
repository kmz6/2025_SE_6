import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getLectureList } from "../../apis/attendance/lecturelist";
import * as S from "../../styles/LectureList.style.js";

const ProfLectureList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [myLectures, setMyLectures] = useState([]);

  // 강의 목록 가져온 후 필터링
  useEffect(() => {
    const fetchLectures = async () => {
      if (user) {
        const data = await getLectureList(user.user_id);
        console.log(data);
        // "25-1"만 필터링
        const filtered = data.filter((lec) => lec.semester === "25-1");
        console.log("가져온 강의 목록: ", filtered);
        setMyLectures(filtered);
      }
    };
    fetchLectures();
  }, [user]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <S.Container>
      <S.Title>담당 강의 목록</S.Title>
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
              onClick={() => navigate(`/professor/attendance/${lec.course_id}`)}
            >
              <S.Cell>{lec.course_name}</S.Cell>
              <S.Cell>
                {lec.course_times ? lec.course_times : "시간 미등록"}
              </S.Cell>
            </S.Row>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default ProfLectureList;