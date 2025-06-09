import { useNavigate } from "react-router-dom";
import * as S from "./GradeInput.style";

function courseList({ courses }) {
    const navigate = useNavigate();
    console.log(courses);

    return (
        <S.Table>
            <thead>
                <S.Row>
                    <S.CellHead>강의명</S.CellHead>
                    <S.CellHead>강의시간</S.CellHead>
                    <S.CellHead>입력 상태</S.CellHead>
                </S.Row>
            </thead>
            <tbody>
                {courses.map((c) => (
                    <S.Row key={c.course_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/professor/grade/input/${c.course_id}`)}
                    >
                        <S.Cell style={{ width: "33%" }}>{c.course_name}</S.Cell>
                        <S.Cell style={{ width: "33%" }}>
                            {c.times?.map((time, index) => (
                                <span key={index}>
                                    {time.course_day} {time.course_period}교시
                                    {index !== c.times.length - 1 && ', '}
                                </span>
                            ))}
                        </S.Cell>
                        <S.Cell>
                            {c.status}
                        </S.Cell>
                    </S.Row>
                ))}
            </tbody>
        </S.Table >
    );
}

export default courseList;