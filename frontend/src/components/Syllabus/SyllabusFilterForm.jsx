import React from "react";
import { FormBox, FormRow, Label, Input, Select } from "../../styles/Syllabus.style";

export default function SyllabusFilterForm({ filters, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <FormBox>
      <FormRow>
        <Label>년도/학기</Label>
        <Select
          name="semester"
          value={filters.semester}
          onChange={handleInputChange}
        >
          <option value="2025-1">2025년 1학기</option>
          <option value="2024-2">2024년 2학기</option>
        </Select>
      </FormRow>

      <FormRow>
        <Label>과목명</Label>
        <Input
          type="text"
          name="courseName"
          value={filters.courseName}
          onChange={handleInputChange}
          placeholder="과목명을 입력하세요"
        />
      </FormRow>

      <FormRow>
        <Label>담당교수</Label>
        <Input
          type="text"
          name="professor"
          value={filters.professor}
          onChange={handleInputChange}
          placeholder="교수 이름"
        />
      </FormRow>
    </FormBox>
  );
}
