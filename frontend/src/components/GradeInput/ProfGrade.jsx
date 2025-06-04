import { useState, useEffect } from "react";
import * as S from "./ProfGrade.style";

const ProfGrade = ({ courseData, studentData }) => {
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
        </S.Container >
    );
};

export default ProfGrade;