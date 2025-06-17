import * as S from "../../styles/GradeInput.style";

const CourseTable = ({ courseData }) => {
    return (
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
    )
};

export default CourseTable;