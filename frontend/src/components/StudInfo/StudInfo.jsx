import * as S from "./StudInfo.style";
import { useEffect, useState } from "react";
import { getStudInfo } from "../../apis/studinfo/student";

const StudInfo = ({ user_id }) => {
    const [studentData, setStudentData] = useState(null);

    //학생 정보 가져오기
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentInfo = await getStudInfo(user_id);
                setStudentData(studentInfo);
            } catch (err) {
                console.error("사용자 정보 불러오기 실패:", err.message);
            }
        };

        fetchStudentData();
    }, [user_id]);

    if (!studentData) return <div>학생 정보를 찾을 수 없습니다.</div>; //정보가 없는 경우

    return (
        <S.Table>
            <tbody>
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
            </tbody>
        </S.Table>
    );
}

export default StudInfo;
