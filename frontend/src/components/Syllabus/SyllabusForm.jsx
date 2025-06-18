import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/Syllabus.style";

const SyllabusForm = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: initialData?.course_name || "",
    courseCode: initialData?.course_code || "",
    semester: initialData?.semester ||
      `${String(initialData?.course_year).slice(2)}-${initialData?.course_semester}` || "",
    courseType: initialData?.course_type || "",
    time: initialData?.course_times || "",
    room: `${initialData?.building} ${initialData?.room}` || "",
    faculty_id: initialData?.faculty_id || "",
    faculty_name: initialData?.faculty_name || "",
    credit: initialData?.credit || "",
    attendance: initialData?.attendance || "",
    midterm: initialData?.midterm_exam || "",
    final: initialData?.final_exam || "",
    assignment: initialData?.assignment || "",
    etc: initialData?.etc || ""
  });
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "강의계획서가 제출되었습니다.") {
      navigate(`/professor/syllabus`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { time, room } = formData;

    // 입력 조건 지정
    const timePattern = /^[가-힣]+\s?\d+교시,\s?[가-힣]+\s?\d+교시$/;
    const roomPattern = /^[가-힣]+\s\d+$/;

    if (!timePattern.test(time)) {
      openModal("강의시간 형식이 잘못되었습니다.\n예시: 월 1교시, 수 2교시");
      return;
    }

    if (!roomPattern.test(room)) {
      openModal("강의실 형식이 잘못되었습니다.\n예시: 새빛관 101");
      return;
    }

    const [yearPart, semesterPart] = formData.semester.split("-");
    const payload = {
      building: formData.room.split(" ")[0],
      room: formData.room.split(" ")[1] || "",
      course_times: formData.time,
      attendance: formData.attendance,
      midterm_exam: formData.midterm,
      final_exam: formData.final,
      assignment: formData.assignment,
      etc: formData.etc,
      credit: formData.credit,
      course_year: parseInt("20" + yearPart),
      course_semester: parseInt(semesterPart),
      faculty_id: formData.faculty_id,
    };

    if (onSubmit) onSubmit(payload);
    console.log("payload faculty_id:", payload.faculty_id);
  };

  return (
    <S.Container>
      <S.Table>
        <tbody>
          <S.Row>
            <S.CellHead>교과목명</S.CellHead>
            <S.Cell><span>{formData.courseName}</span></S.Cell>
            <S.CellHead>년도학기</S.CellHead>
            <S.Cell><span>{formData.semester}</span></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>학정번호</S.CellHead>
            <S.Cell><span>{formData.courseCode}</span></S.Cell>
            <S.CellHead>이수구분</S.CellHead>
            <S.Cell><span>{formData.courseType}</span></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>강의시간</S.CellHead>
            <S.Cell><input name="time" value={formData.time} onChange={handleChange} /></S.Cell>
            <S.CellHead>강의실</S.CellHead>
            <S.Cell><input name="room" value={formData.room} onChange={handleChange} /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>담당교수</S.CellHead>
            <S.Cell><span>{formData.faculty_name}</span></S.Cell>
            <input type="hidden" name="faculty_id" value={formData.faculty_id} />
            <S.CellHead>학점</S.CellHead>
            <S.Cell><span>{formData.credit}</span></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>출석 비율 (%)</S.CellHead>
            <S.Cell><input name="attendance" value={formData.attendance} onChange={handleChange} type="number" /></S.Cell>
            <S.CellHead>중간고사 비율 (%)</S.CellHead>
            <S.Cell><input name="midterm" value={formData.midterm} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>기말고사 비율 (%)</S.CellHead>
            <S.Cell><input name="final" value={formData.final} onChange={handleChange} type="number" /></S.Cell>
            <S.CellHead>과제 비율 (%)</S.CellHead>
            <S.Cell><input name="assignment" value={formData.assignment} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>기타 비율 (%)</S.CellHead>
            <S.Cell colSpan={3}><input name="etc" value={formData.etc} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
        </tbody>
      </S.Table>
      <S.ButtonWrapper>
        <S.Button onClick={handleSubmit}>제출</S.Button>
      </S.ButtonWrapper>

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
};

export default SyllabusForm;