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
    professor: initialData?.faculty_id || "",
    credit: initialData?.credit || "",
    attendance: initialData?.attendance || "",
    midterm: initialData?.midterm_exam || "",
    final: initialData?.final_exam || "",
    assignment: initialData?.assignment || "",
    etc: initialData?.etc || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const [yearPart, semesterPart] = formData.semester.split("-");

    const payload = {
      building: formData.room.split(" ")[0],
      room: formData.room.split(" ")[1] || "",
      attendance: formData.attendance,
      midterm_exam: formData.midterm,
      final_exam: formData.final,
      assignment: formData.assignment,
      etc: formData.etc,
      credit: formData.credit,
      course_year: parseInt("20" + yearPart),
      course_semester: parseInt(semesterPart),
    };

    if (onSubmit) onSubmit(payload);
    alert("강의계획서가 제출되었습니다.");
    navigate("/professor/syllabus");
  };

  return (
    <S.Container>
      <S.Table>
        <tbody>
          <S.Row>
            <S.CellHead>교과목명</S.CellHead>
            <S.Cell><input name="courseName" value={formData.courseName} onChange={handleChange} /></S.Cell>
            <S.CellHead>년도학기</S.CellHead>
            <S.Cell><input name="semester" value={formData.semester} onChange={handleChange} /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>학정번호</S.CellHead>
            <S.Cell><input name="courseCode" value={formData.courseCode} onChange={handleChange} /></S.Cell>
            <S.CellHead>이수구분</S.CellHead>
            <S.Cell><input name="courseType" value={formData.courseType} onChange={handleChange} /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>강의시간</S.CellHead>
            <S.Cell><input name="time" value={formData.time} onChange={handleChange} /></S.Cell>
            <S.CellHead>강의실</S.CellHead>
            <S.Cell><input name="room" value={formData.room} onChange={handleChange} /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>담당교수</S.CellHead>
            <S.Cell><input name="professor" value={formData.professor} onChange={handleChange} /></S.Cell>
            <S.CellHead>학점</S.CellHead>
            <S.Cell><input name="credit" value={formData.credit} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>출석 비율</S.CellHead>
            <S.Cell><input name="attendance" value={formData.attendance} onChange={handleChange} type="number" /></S.Cell>
            <S.CellHead>중간고사 비율</S.CellHead>
            <S.Cell><input name="midterm" value={formData.midterm} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>기말고사 비율</S.CellHead>
            <S.Cell><input name="final" value={formData.final} onChange={handleChange} type="number" /></S.Cell>
            <S.CellHead>과제 비율</S.CellHead>
            <S.Cell><input name="assignment" value={formData.assignment} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
          <S.Row>
            <S.CellHead>기타 비율</S.CellHead>
            <S.Cell colSpan={3}><input name="etc" value={formData.etc} onChange={handleChange} type="number" /></S.Cell>
          </S.Row>
        </tbody>
      </S.Table>
      <S.ButtonWrapper>
        <S.Button onClick={handleSubmit}>제출</S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default SyllabusForm;