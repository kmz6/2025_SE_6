import { useNavigate } from "react-router-dom";
import { Table, Row, Cell, CellHead } from "../../styles/Syllabus.style";

export default function SyllabusResultTable({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (courseCode) => {
    navigate(`/student/syllabus/${courseCode}`);
  };

  if (results.length === 0) {
    return <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <CellHead>학정번호</CellHead>
          <CellHead>과목명</CellHead>
          <CellHead>이수구분</CellHead>
          <CellHead>학점</CellHead>
          <CellHead>강의실</CellHead>
          <CellHead>교수</CellHead>
        </tr>
      </thead>
      <tbody>
        {results.map((course) => (
          <Row
            key={course.course_code}
            onClick={() => handleRowClick(course.course_code)}
            style={{ cursor: "pointer" }}
          >
            <Cell>{course.course_code}</Cell>
            <Cell>{course.course_name}</Cell>
            <Cell>{course.course_type}</Cell>
            <Cell>{course.credit}</Cell>
            <Cell>{course.building} {course.room}</Cell>
            <Cell>{course.faculty_name}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}