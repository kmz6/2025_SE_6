import React, { useState } from "react";
import styled from "styled-components";
import { courseData } from "../../mocks/courseData";

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 1000px;
  table-layout: fixed;
  margin-bottom: 1.5rem;

  td, th {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    word-wrap: break-word;
  }

  td input {
    width: 100%;
    border: none;
    text-align: center;
    background-color: transparent;
  }

  td input:focus {
    outline: none;
    background-color: #f9f9f9;
  }

  th {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0f5ec5;
  }
`;

const SyllabusForm = ({ initialData, onSubmit }) => {
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
    if (onSubmit) {
      onSubmit(formData); // ProfSyllabusPage에서 넘겨준 함수 호출
    }
  };

  return (
    <TableWrapper>
      <StyledTable>
        <tbody>
          <tr>
            <th>교과목명</th>
            <td><input name="courseName" value={formData.courseName} onChange={handleChange} /></td>
            <th>년도학기</th>
            <td><input name="semester" value={formData.semester} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>학정번호</th>
            <td><input name="courseCode" value={formData.courseCode} onChange={handleChange} /></td>
            <th>이수구분</th>
            <td><input name="courseType" value={formData.courseType} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>강의시간</th>
            <td><input name="time" value={formData.time} onChange={handleChange} /></td>
            <th>강의실</th>
            <td><input name="room" value={formData.room} onChange={handleChange} /></td>
          </tr>
          <tr>
            <th>담당교수</th>
            <td><input name="professor" value={formData.professor} onChange={handleChange} /></td>
            <th>학점</th>
            <td><input name="credit" value={formData.credit} onChange={handleChange} type="number" /></td>
          </tr>
          <tr>
            <th>출석 비율</th>
            <td><input name="attendance" value={formData.attendance} onChange={handleChange} type="number" /></td>
            <th>중간고사 비율</th>
            <td><input name="midterm" value={formData.midterm} onChange={handleChange} type="number" /></td>
          </tr>
          <tr>
            <th>기말고사 비율</th>
            <td><input name="final" value={formData.final} onChange={handleChange} type="number" /></td>
            <th>과제 비율</th>
            <td><input name="assignment" value={formData.assignment} onChange={handleChange} type="number" /></td>
          </tr>
          <tr>
            <th>기타 비율</th>
            <td colSpan={3}><input name="etc" value={formData.etc} onChange={handleChange} type="number" /></td>
          </tr>
        </tbody>
      </StyledTable>

      <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
    </TableWrapper>
  );
};

export default SyllabusForm;