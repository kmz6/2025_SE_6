import * as S from "./StudInfo.style";

import {
    studentData,
} from "../../mocks/userData";

const StudInfo = ({ user_id }) => {
    return (
        <S.Table>
            <S.Row>
                <S.CellHead>이름</S.CellHead>
                <S.Cell>{studentData.name}</S.Cell>
                <S.CellHead>학번</S.CellHead>
                <S.Cell>{studentData.student_id}</S.Cell>
                <S.CellHead>학과</S.CellHead>
                <S.Cell>{studentData.department}</S.Cell>
                <S.CellHead>학적상태</S.CellHead>
                <S.Cell>
                    {studentData.enrollment_status === "enrolled"
                        ? "재학"
                        : studentData.enrollment_status === "on_leave"
                            ? "휴학"
                            : studentData.enrollment_status}
                </S.Cell>
            </S.Row>
        </S.Table>
    );
}

export default StudInfo;
