import React, { useState, useMemo } from "react";
import * as S from "./ProfGrade.style";

const ProfGrade = ({ courseData, studentData }) => {
    const [sortBy, setSortBy] = useState("student_id"); //초기 정렬 기준은 student_id

    //정렬된 데이터 생성
    const sortedStudents = useMemo(() => {
        const copied = [...studentData]; //배열 복사
        switch (sortBy) {
            case "student_id": //학번 순 정렬
                return copied.sort((a, b) => a.student_id.localeCompare(b.student_id));
            case "name": //이름 순 정렬
                return copied.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return copied;
        }
    }, [sortBy, studentData]);

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
                <S.SortContainer>
                    <S.SortLabel>정렬 기준: </S.SortLabel>
                    <S.SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="student_id">학번순</option>
                        <option value="name">이름순</option>
                    </S.SortSelect>
                </S.SortContainer>
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
                    {sortedStudents.map((student) => (
                        <S.Row key={student.student_id}>
                            <S.Cell>{student.department}</S.Cell>
                            <S.Cell>{student.student_id}</S.Cell>
                            <S.Cell>{student.name}</S.Cell>
                            <S.Cell><S.GradeInput type="text" placeholder="점수 입력"></S.GradeInput></S.Cell>
                            <S.Cell><S.GradeInput type="text" placeholder="점수 입력"></S.GradeInput></S.Cell>
                            <S.Cell><S.GradeInput type="text" placeholder="점수 입력"></S.GradeInput></S.Cell>
                            <S.Cell><S.GradeInput type="text" placeholder="점수 입력"></S.GradeInput></S.Cell>
                            <S.Cell><S.GradeInput type="text" placeholder="점수 입력"></S.GradeInput></S.Cell>
                            <S.Cell></S.Cell>
                            <S.Cell></S.Cell>
                        </S.Row>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default ProfGrade;