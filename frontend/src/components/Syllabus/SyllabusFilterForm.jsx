import React from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function SyllabusFilterForm({ filters, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <FormWrapper>
      <FormRow>
        <Label>년도/학기</Label>
        <Select name="semester" value={filters.semester} onChange={handleInputChange}>
          <option value="25-1">2025년 1학기</option>
          <option value="25-2">2025년 2학기</option>
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
    </FormWrapper>
  );
}