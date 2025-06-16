import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import CoursePlanForm from "../../components/Syllabus/SyllabusForm";
import { getCourseDetail, updateCourseDetail } from "../../apis/syllabus/syllabus";
import axiosInstance from "../../apis/axiosInstance";
import * as S from "../../styles/Syllabus.style";

export default function ProfSyllabusPage() {
  const navigate = useNavigate();
  
  const { lectureId } = useParams();
  const [course, setCourse] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "강의계획서가 저장되었습니다.") {
      navigate(`/professor/syllabus`);
    }
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        let courseCode = lectureId;

        // 숫자(course_id) -> 변환
        if (!isNaN(Number(lectureId))) {
          const res = await axiosInstance.get(`/api/course/${lectureId}/code`);
          courseCode = res.data.course_code;
        }

        const courseData = await getCourseDetail(courseCode);
        setCourse(courseData);
      } catch (err) {
        console.error("강의 정보 불러오기 실패", err);
      }
    };

    if (lectureId) fetchCourseDetail();
  }, [lectureId]);

  const handleSubmit = (form) => {
    updateCourseDetail(course.course_code, form) // course_code 기준
      .then(() => openModal("강의계획서가 저장되었습니다."))
      .catch((err) => console.error("강의계획서 저장 실패", err));
  };

  if (!course) {
    return <S.Container>해당 강의 정보를 찾을 수 없습니다.</S.Container>;
  }

  return (
    <S.Container>
      <S.Title>강의계획서 작성</S.Title>
      <CoursePlanForm initialData={course} onSubmit={handleSubmit} />
      {modalVisible && (
        <S.ModalOverlay>
          <S.Modal>
            <p>{modalMessage}</p>
            <S.ModalCloseButton onClick={closeModal}>확인</S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}