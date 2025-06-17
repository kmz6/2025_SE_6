import { gradeLists } from "../../constants/gradePoints"
import * as S from "../../styles/GradeInput.style";

const StudentRow = ({ s, handleInputChange, handleGradeChange }) => {
    return (
        <S.Row>
            <S.Cell>{s.department}</S.Cell>
            <S.Cell>{s.student_id}</S.Cell>
            <S.Cell>{s.name}</S.Cell>
            <S.Cell>
                <S.GradeInput
                    type="number"
                    placeholder="점수 입력"
                    value={s.attendance}
                    onChange={e => handleInputChange(s.student_id, 'attendance', e.target.value)}
                >
                </S.GradeInput>
            </S.Cell>
            <S.Cell>
                <S.GradeInput
                    type="number"
                    placeholder="점수 입력"
                    value={s.midterm_exam}
                    onChange={e => handleInputChange(s.student_id, 'midterm_exam', e.target.value)}
                >
                </S.GradeInput>
            </S.Cell>
            <S.Cell>
                <S.GradeInput
                    type="number"
                    placeholder="점수 입력"
                    value={s.final_exam}
                    onChange={e => handleInputChange(s.student_id, 'final_exam', e.target.value)}
                >
                </S.GradeInput>
            </S.Cell>
            <S.Cell>
                <S.GradeInput
                    type="number"
                    placeholder="점수 입력"
                    value={s.assignment}
                    onChange={e => handleInputChange(s.student_id, 'assignment', e.target.value)}
                >
                </S.GradeInput>
            </S.Cell>
            <S.Cell>
                <S.GradeInput
                    type="number"
                    placeholder="점수 입력"
                    value={s.etc}
                    onChange={e => handleInputChange(s.student_id, 'etc', e.target.value)}
                >
                </S.GradeInput>
            </S.Cell>
            <S.Cell>{s.total}</S.Cell>
            <S.Cell>
                <S.Select
                    value={s.grade}
                    onChange={e => handleGradeChange(s.student_id, e.target.value)}
                >
                    {gradeLists.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </S.Select>
            </S.Cell>
        </S.Row >
    );
}

export default StudentRow;