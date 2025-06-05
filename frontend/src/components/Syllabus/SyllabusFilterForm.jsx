import React from "react";
import * as S from "../../styles/Syllabus.style";

export default function SyllabusFilterForm({ filters, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <S.FormBox>
      <S.FormRow>
        <S.Label>년도/학기</S.Label>
        <S.Select
          name="semester"
          value={filters.semester}
          onChange={handleInputChange}
        >
          <option value="2025-1">2025년 1학기</option>
          <option value="2024-2">2024년 2학기</option>
        </S.Select>
      </S.FormRow>

      <S.FormRow>
        <S.Label>과목명</S.Label>
        <S.Input
          type="text"
          name="courseName"
          value={filters.courseName}
          onChange={handleInputChange}
          placeholder="과목명을 입력하세요"
        />
      </S.FormRow>

      <S.FormRow>
        <S.Label>담당교수</S.Label>
        <S.Input
          type="text"
          name="professor"
          value={filters.professor}
          onChange={handleInputChange}
          placeholder="교수 이름"
        />
      </S.FormRow>
    </S.FormBox>
  );
}
