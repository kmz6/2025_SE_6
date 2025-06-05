import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import ProfGradeList from "../../components/GradeInput/ProfGradeList";
import { getProfCourse } from "../../apis/grade/profGrade";
import * as S from "../../styles/GradeListPage.style.js";

function GradeListPage() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        if (!user) return; //user 없어도 계속 hook 호출

        const fetchCourseData = async () => {
            // 강의 정보 불러오기
            const profCourses = await getProfCourse(user.user_id);
            setCourseList(profCourses);
        };
        fetchCourseData();
    }, [user]);

    return (
        <S.Container>
            <S.Title>담당 강의 성적 입력</S.Title>
            <ProfGradeList courses={courseList}></ProfGradeList>
        </S.Container>
    );
}

export default GradeListPage;