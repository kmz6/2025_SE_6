import { useNavigate } from "react-router-dom";
import * as S from "./GradeInput.style";

function courseList({ courses }) {
    const navigate = useNavigate();

    return (
        <S.Table>
            <thead>
                <S.Row>
                    <S.CellHead>강의명</S.CellHead>
                </S.Row>
            </thead>
            <tbody>
                {courses.map((c) => (
                    <S.Row key={c.course_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/professor/grade/input/${c.course_id}`)}
                    >
                        <S.Cell>{c.course_name}</S.Cell>
                    </S.Row>
                ))}
            </tbody>
        </S.Table >
    );
}

export default courseList;