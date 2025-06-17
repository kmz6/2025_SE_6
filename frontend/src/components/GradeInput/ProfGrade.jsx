import { useState, useEffect } from "react";
import HeaderRow from "./HeaderRow";
import StudentRow from "./StudentRow";
import CourseTable from "./CourseTable";
import { patchStudentScore } from "../../apis/grade/profGrade";
import * as S from "../../styles/GradeInput.style";

const ProfGrade = ({ courseData, studentData }) => {
    const [sortBy, setSortBy] = useState("student_id"); // 초기 정렬은 학번순
    const [sortedStudents, setSortedStudents] = useState([]);

    const [modalMessage, setModalMessage] = useState("");
    const [modalAction, setModalAction] = useState({ onConfirm: () => { }, onCancel: () => { } });
    const [modalVisible, setModalVisible] = useState(false);
    const [cancelVisible, setCancelVisible] = useState(false);

    useEffect(() => {
        setSortedStudents(studentData.map(s => {
            const attendance = Number(s.attendance) || 0;
            const mid = Number(s.midterm_exam) || 0;
            const final = Number(s.final_exam) || 0;
            const assignment = Number(s.assignment) || 0;
            const etc = Number(s.etc) || 0;

            // 총점 계산
            const total = (
                attendance * courseData.attendance / 100 +
                mid * courseData.midterm_exam / 100 +
                final * courseData.final_exam / 100 +
                assignment * courseData.assignment / 100 +
                etc * courseData.etc / 100
            ).toFixed(2);

            return {
                ...s,
                attendance,
                mid,
                final,
                assignment,
                etc,
                total,
                grade: s.grade || '',
            };
        }));
    }, [studentData, courseData]);

    // 정렬 기준 변경
    const handleSortChange = (e) => {
        const sortKey = e.target.value;
        setSortBy(sortKey);
        setSortedStudents(prev => {
            const sorted = [...prev];
            if (sortKey === "student_id") {
                sorted.sort((a, b) => a.student_id.localeCompare(b.student_id)); // 학번 순
            } else if (sortKey === "name") {
                sorted.sort((a, b) => a.name.localeCompare(b.name)); // 이름 순
            } else if (sortKey === "total") {
                sorted.sort((a, b) => Number(b.total) - Number(a.total)); // 총점 순
            }
            return sorted;
        });
    };

    // 점수 입력
    const handleInputChange = (student_id, field, value) => {
        if (value === '' || /^\d{0,3}$/.test(value) && Number(value) <= 100) {
            setSortedStudents(prev =>
                prev.map(s => {
                    if (s.student_id === student_id) {
                        const updated = { ...s, [field]: value === '' ? '' : Number(value) };

                        const attendance = updated.attendance === '' ? 0 : updated.attendance;
                        const midterm = updated.midterm_exam === '' ? 0 : updated.midterm_exam;
                        const finalExam = updated.final_exam === '' ? 0 : updated.final_exam;
                        const assignment = updated.assignment === '' ? 0 : updated.assignment;
                        const etc = updated.etc === '' ? 0 : updated.etc;

                        // 총점 계산
                        const total = (
                            attendance * courseData.attendance / 100 +
                            midterm * courseData.midterm_exam / 100 +
                            finalExam * courseData.final_exam / 100 +
                            assignment * courseData.assignment / 100 +
                            etc * courseData.etc / 100
                        ).toFixed(2);

                        return { ...updated, total };
                    }
                    return s;
                })
            );
        }
    };

    // 점수 입력
    const handleGradeChange = (student_id, value) => {
        setSortedStudents(prev =>
            prev.map(s =>
                s.student_id === student_id ? { ...s, grade: value } : s
            )
        );
    };

    const openModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = (onCloseCallback) => {
        setModalVisible(false);
        setCancelVisible(false);
        if (onCloseCallback) onCloseCallback();
    };

    // 확인, 취소 모달
    const showConfirmModal = (message) => {
        return new Promise((resolve) => {
            setModalMessage(message);
            setModalVisible(true);
            setCancelVisible(true);

            // 확인 버튼 누름
            const handleConfirm = () => {
                closeModal();
                resolve(true);
            };

            // 취소 버튼 누름
            const handleCancelClick = () => {
                closeModal();
                resolve(false);
            };

            setModalAction(() => ({
                onConfirm: handleConfirm,
                onCancel: handleCancelClick
            }));
        });
    };

    // 저장 버튼 클릭
    const handleSave = async () => {
        try {
            const confirmed = await showConfirmModal("저장하시겠습니까?");
            if (!confirmed) return;

            for (const student of sortedStudents) {
                // 학생 데이터 하나씩 업데이트
                await patchStudentScore(student);
            }
            openModal("저장되었습니다.");
        } catch (error) {
            console.error(error);
            openModal("오류가 발생했습니다.");
        }
    };

    return (
        <S.Container>
            <S.Title>{courseData.course_name} | {courseData.course_code}</S.Title>
            <S.SubTitle>반영 비율 / 만점 점수</S.SubTitle>
            <CourseTable courseData={courseData} />

            <S.TitleRow>
                <S.SubTitle>학생 성적</S.SubTitle>
                <S.SelectContainer>
                    <S.Label>정렬 기준: </S.Label>
                    <S.Select value={sortBy} onChange={handleSortChange}>
                        <option value="student_id">학번순</option>
                        <option value="name">이름순</option>
                        <option value="total">총점순</option>
                    </S.Select>
                </S.SelectContainer>
            </S.TitleRow>
            <S.Table>
                <thead>
                    <HeaderRow />
                </thead>
                <tbody>
                    {sortedStudents.map((s) => (
                        <StudentRow key={s.student_id} s={s} handleInputChange={handleInputChange} handleGradeChange={handleGradeChange} />
                    ))}
                </tbody>
            </S.Table>

            <S.ButtonWrapper>
                <S.CheckButton onClick={handleSave}>저장</S.CheckButton>
            </S.ButtonWrapper>

            {modalVisible && (
                <S.ModalOverlay>
                    <S.Modal>
                        <p>{modalMessage}</p>
                        {cancelVisible ? (
                            <S.ModalButtonWrapper>
                                <S.ModalCloseButton onClick={modalAction.onConfirm}>확인</S.ModalCloseButton>
                                <S.ModalCloseButton onClick={modalAction.onCancel}>취소</S.ModalCloseButton>
                            </S.ModalButtonWrapper>
                        ) : (
                            <S.ModalButtonWrapper>
                                <S.ModalCloseButton onClick={() => closeModal(() => window.location.reload())}>확인</S.ModalCloseButton>
                            </S.ModalButtonWrapper>
                        )}
                    </S.Modal>
                </S.ModalOverlay>
            )}
        </S.Container>
    );
};

export default ProfGrade;