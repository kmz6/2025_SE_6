import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 24px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 70px;
`;

const Row = styled.tr`
  border: 1px solid #ccc;
`;

const CellHead = styled.td`
  width: 10%;
  padding: 15px;
  font-weight: bold;
  background-color: #f3f6f9;
  border: 1px solid #ccc;
`;

const Cell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const Button = styled.button`
  background-color: #003366;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;


const SyllabusForm = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: initialData?.course_name || "",
    courseCode: initialData?.course_code || "",
    semester: "25-1",
    courseType: initialData?.course_type || "",
    time: initialData?.time?.map(t => `${t.course_day}${t.course_period}`).join(", ") || "",
    room: `${initialData?.building_name} ${initialData?.room_number}` || "",
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
    console.log("제출된 데이터:", formData);
    if (onSubmit) onSubmit(formData);
    alert("강의계획서가 제출되었습니다.");
    navigate("/professor/syllabus");
  };

  return (
    <Container>
      <Table>
        <tbody>
          <Row>
            <CellHead>교과목명</CellHead>
            <Cell><input name="courseName" value={formData.courseName} onChange={handleChange} /></Cell>
            <CellHead>년도학기</CellHead>
            <Cell><input name="semester" value={formData.semester} onChange={handleChange} /></Cell>
          </Row>
          <Row>
            <CellHead>학정번호</CellHead>
            <Cell><input name="courseCode" value={formData.courseCode} onChange={handleChange} /></Cell>
            <CellHead>이수구분</CellHead>
            <Cell><input name="courseType" value={formData.courseType} onChange={handleChange} /></Cell>
          </Row>
          <Row>
            <CellHead>강의시간</CellHead>
            <Cell><input name="time" value={formData.time} onChange={handleChange} /></Cell>
            <CellHead>강의실</CellHead>
            <Cell><input name="room" value={formData.room} onChange={handleChange} /></Cell>
          </Row>
          <Row>
            <CellHead>담당교수</CellHead>
            <Cell><input name="professor" value={formData.professor} onChange={handleChange} /></Cell>
            <CellHead>학점</CellHead>
            <Cell><input name="credit" value={formData.credit} onChange={handleChange} type="number" /></Cell>
          </Row>
          <Row>
            <CellHead>출석 비율</CellHead>
            <Cell><input name="attendance" value={formData.attendance} onChange={handleChange} type="number" /></Cell>
            <CellHead>중간고사 비율</CellHead>
            <Cell><input name="midterm" value={formData.midterm} onChange={handleChange} type="number" /></Cell>
          </Row>
          <Row>
            <CellHead>기말고사 비율</CellHead>
            <Cell><input name="final" value={formData.final} onChange={handleChange} type="number" /></Cell>
            <CellHead>과제 비율</CellHead>
            <Cell><input name="assignment" value={formData.assignment} onChange={handleChange} type="number" /></Cell>
          </Row>
          <Row>
            <CellHead>기타 비율</CellHead>
            <Cell colSpan={3}><input name="etc" value={formData.etc} onChange={handleChange} type="number" /></Cell>
          </Row>
        </tbody>
      </Table>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>제출</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default SyllabusForm;