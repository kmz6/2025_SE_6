import { useNavigate } from "react-router-dom";
import * as S from "../../styles/Syllabus.style";

export default function SyllabusResultTable({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (courseId) => {
    navigate(`/student/syllabus/${courseId}`);
  };

  if (results.length === 0) {
    return <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>;
  }

  return (
    <S.Table>
      <thead>
        <tr>
          <S.CellHead>학정번호</S.CellHead>
          <S.CellHead>과목명</S.CellHead>
          <S.CellHead>이수구분</S.CellHead>
          <S.CellHead>학점</S.CellHead>
          <S.CellHead>강의실</S.CellHead>
          <S.CellHead>교수</S.CellHead>
        </tr>
      </thead>
      <tbody>
        {results.map((course) => (
          <S.Row
            key={course.course_id}
            onClick={() => handleRowClick(course.course_id)} // <- 수정
            style={{ cursor: "pointer" }}
          >
            <S.Cell>{course.course_code}</S.Cell>
            <S.Cell>{course.course_name}</S.Cell>
            <S.Cell>{course.course_type}</S.Cell>
            <S.Cell>{course.credit}</S.Cell>
            <S.Cell>{course.building} {course.room}</S.Cell>
            <S.Cell>{course.faculty_name}</S.Cell>
          </S.Row>
        ))}
      </tbody>
    </S.Table>
  );
}