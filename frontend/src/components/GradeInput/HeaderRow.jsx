import * as S from "../../styles/GradeInput.style";

const HeaderRow = () => {
    return (
        <S.Row>
            <S.CellHead width="16%">학과</S.CellHead>
            <S.CellHead width="10%">학번</S.CellHead>
            <S.CellHead width="10%">이름</S.CellHead>
            <S.CellHead width="10%">출석</S.CellHead>
            <S.CellHead width="10%">중간</S.CellHead>
            <S.CellHead width="10%">기말</S.CellHead>
            <S.CellHead width="10%">과제</S.CellHead>
            <S.CellHead width="10%">기타</S.CellHead>
            <S.CellHead width="8%">총점</S.CellHead>
            <S.CellHead width="6%">성적</S.CellHead>
        </S.Row>
    );
}

export default HeaderRow;