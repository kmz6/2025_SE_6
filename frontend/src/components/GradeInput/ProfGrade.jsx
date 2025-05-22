import React, { useState, useMemo } from "react";
import * as S from "./ProfGrade.style";

const ProfGrade = ({ courseData, studentData }) => {
    const [sortBy, setSortBy] = useState("student_id"); //초기 정렬 기준은 student_id
    const [errorMessages, setErrorMessages] = useState({}); //에러 메세지

    //학생 점수 정보
    const [grades, setGrades] = useState(() =>
        studentData.map((student) => ({
            student_id: student.student_id,
            attendance: '',
            mid: '',
            final: '',
            assignment: '',
            etc: '',
            total: 0,
            grade: '',
        }))
    );

    //정렬된 데이터 생성
    const sortedStudents = useMemo(() => {
        //studentData에 grades의 total 점수 붙이기
        const merged = studentData.map(student => {
            const grade = grades.find(g => g.student_id === student.student_id);
            return {
                ...student,
                total: grade?.total || 0,
            };
        });

        switch (sortBy) {
            case "student_id": //학번순
                return merged.sort((a, b) => a.student_id.localeCompare(b.student_id));
            case "name": //이름순
                return merged.sort((a, b) => a.name.localeCompare(b.name));
            case "total": //총점순
                return merged.sort((a, b) => b.total - a.total);
            default:
                return merged;
        }
    }, [sortBy, studentData, grades]);

    //점수 업데이트
    const handleInputChange = (id, field, value) => {
        const updated = grades.map((entry) => {
            if (entry.student_id !== id) return entry;

            const newEntry = { ...entry, [field]: value };

            //유효성 검사
            const inputFields = ['attendance', 'mid', 'final', 'assignment', 'etc'];
            let error = null;

            for (const key of inputFields) {
                const rawValue = key === field ? value : entry[key];
                if (rawValue === '') continue; //빈 입력은 허용

                //숫자가 아닌 경우
                if (isNaN(rawValue)) {
                    error = `${key}에 숫자가 아닌 값이 입력되었습니다.`;
                    break;
                }

                //0에서 100 사이가 아닌 경우
                const num = Number(rawValue);
                if (num < 0 || num > 100) {
                    error = `${key} 점수는 0에서 100 사이여야 합니다.`;
                    break;
                }
            }

            if (error) {
                setErrorMessages((prev) => ({ ...prev, [id]: error }));
                return entry;
            } else {
                setErrorMessages((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[id];
                    return newErrors;
                });
            }

            //숫자로 변환
            const attendance = Number(newEntry.attendance) || 0;
            const mid = Number(newEntry.mid) || 0;
            const final = Number(newEntry.final) || 0;
            const assignment = Number(newEntry.assignment) || 0;
            const etc = Number(newEntry.etc) || 0;

            //비율에 맞게 총점 계산 (2자리수까지)
            const total = (
                attendance * (courseData.attendance / 100) +
                mid * (courseData.midterm_exam / 100) +
                final * (courseData.final_exam / 100) +
                assignment * (courseData.assignment / 100) +
                etc * (courseData.etc / 100)
            ).toFixed(2);

            newEntry.total = Number(total);
            return newEntry;
        });

        setGrades(updated);
    };

    return (
        <S.Container>
            <S.Title>{courseData.course_name} | {courseData.course_code}</S.Title>
            <S.SubTitle>반영 비율 / 만점 점수</S.SubTitle>
            <S.Table>
                <thead>
                    <S.Row>
                        <S.CellHead>출석</S.CellHead>
                        <S.CellHead>중간고사</S.CellHead>
                        <S.CellHead>기말고사</S.CellHead>
                        <S.CellHead>과제</S.CellHead>
                        <S.CellHead>기타</S.CellHead>
                    </S.Row>
                </thead>
                <tbody>
                    <S.Row>
                        <S.Cell>{courseData.attendance}% / 100</S.Cell>
                        <S.Cell>{courseData.midterm_exam}% / 100</S.Cell>
                        <S.Cell>{courseData.final_exam}% / 100</S.Cell>
                        <S.Cell>{courseData.assignment}% / 100</S.Cell>
                        <S.Cell>{courseData.etc}% / 100</S.Cell>
                    </S.Row>
                </tbody>
            </S.Table>
            <S.TitleRow>
                <S.SubTitle>학생 성적</S.SubTitle>
                <S.SelectContainer>
                    <S.Label>정렬 기준: </S.Label>
                    <S.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="student_id">학번순</option>
                        <option value="name">이름순</option>
                        <option value="total">총점순</option>
                    </S.Select>
                </S.SelectContainer>
            </S.TitleRow>
            <S.Table>
                <thead>
                    <S.Row>
                        <S.CellHead width="14%">학과</S.CellHead>
                        <S.CellHead width="10%">학번</S.CellHead>
                        <S.CellHead width="10%">이름</S.CellHead>
                        <S.CellHead width="10%">출석</S.CellHead>
                        <S.CellHead width="10%">중간</S.CellHead>
                        <S.CellHead width="10%">기말</S.CellHead>
                        <S.CellHead width="10%">과제</S.CellHead>
                        <S.CellHead width="10%">기타</S.CellHead>
                        <S.CellHead width="10%">총점</S.CellHead>
                        <S.CellHead width="6%">성적</S.CellHead>
                    </S.Row>
                </thead>
                <tbody>
                    {sortedStudents.map((student) => {
                        const g = grades.find((e) => e.student_id === student.student_id);
                        return (
                            <S.Row key={student.student_id}>
                                <S.Cell>{student.department}</S.Cell>
                                <S.Cell>{student.student_id}</S.Cell>
                                <S.Cell>{student.name}</S.Cell>
                                <S.Cell>
                                    <S.GradeInputWrapper>
                                        <S.GradeInput
                                            type="text"
                                            placeholder="점수 입력"
                                            value={g?.attendance || ''}
                                            onChange={(e) =>
                                                handleInputChange(student.student_id, 'attendance', e.target.value)
                                            }
                                        />
                                        {errorMessages[student.student_id]?.includes('attendance') && (
                                            <S.Tooltip>{errorMessages[student.student_id]}</S.Tooltip>
                                        )}
                                    </S.GradeInputWrapper>
                                </S.Cell>
                                <S.Cell>
                                    <S.GradeInputWrapper>
                                        <S.GradeInput
                                            type="text"
                                            placeholder="점수 입력"
                                            value={g?.mid || ''}
                                            onChange={(e) =>
                                                handleInputChange(student.student_id, 'mid', e.target.value)
                                            }
                                        />
                                        {errorMessages[student.student_id]?.includes('mid') && (
                                            <S.Tooltip>{errorMessages[student.student_id]}</S.Tooltip>
                                        )}
                                    </S.GradeInputWrapper>
                                </S.Cell>
                                <S.Cell>
                                    <S.GradeInputWrapper>
                                        <S.GradeInput
                                            type="text"
                                            placeholder="점수 입력"
                                            value={g?.final || ''}
                                            onChange={(e) =>
                                                handleInputChange(student.student_id, 'final', e.target.value)
                                            }
                                        />
                                        {errorMessages[student.student_id]?.includes('final') && (
                                            <S.Tooltip>{errorMessages[student.student_id]}</S.Tooltip>
                                        )}
                                    </S.GradeInputWrapper>
                                </S.Cell>
                                <S.Cell>
                                    <S.GradeInputWrapper>
                                        <S.GradeInput
                                            type="text"
                                            placeholder="점수 입력"
                                            value={g?.assignment || ''}
                                            onChange={(e) =>
                                                handleInputChange(student.student_id, 'assignment', e.target.value)
                                            }
                                        />
                                        {errorMessages[student.student_id]?.includes('assignment') && (
                                            <S.Tooltip>{errorMessages[student.student_id]}</S.Tooltip>
                                        )}
                                    </S.GradeInputWrapper>
                                </S.Cell>
                                <S.Cell>
                                    <S.GradeInputWrapper>
                                        <S.GradeInput
                                            type="text"
                                            placeholder="점수 입력"
                                            value={g?.etc || ''}
                                            onChange={(e) =>
                                                handleInputChange(student.student_id, 'etc', e.target.value)
                                            }
                                        />
                                        {errorMessages[student.student_id]?.includes('etc') && (
                                            <S.Tooltip>{errorMessages[student.student_id]}</S.Tooltip>
                                        )}
                                    </S.GradeInputWrapper>
                                </S.Cell>
                                <S.Cell>{g?.total}</S.Cell>
                                <S.Cell>
                                    <S.SelectContainer>
                                        <S.Select>
                                            <option value="grade_A">A</option>
                                            <option value="grade_B">B</option>
                                            <option value="grade_C">C</option>
                                        </S.Select>
                                    </S.SelectContainer>
                                </S.Cell>
                            </S.Row>
                        );
                    })}
                </tbody>
            </S.Table>
            <S.ButtonWrapper>
                <S.CheckButton>저장</S.CheckButton>
            </S.ButtonWrapper>
        </S.Container>
    );
};

export default ProfGrade;