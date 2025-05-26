import React from "react";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const LabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  line-height: normal;
  box-sizing: border-box;
`;

const Select = styled.select`
  flex: 1;
  height: 40px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  line-height: normal;
  box-sizing: border-box;
`;

const Button = styled.button`
  height: 45px;
  background-color: #0078ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #005fd1;
  }
`;

function SignupPage() {
  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Form>
        <LabelGroup>
          <span>구분</span>
          <span>이름</span>
        </LabelGroup>
        <Row>
          <Select defaultValue="">
            <option value="" disabled>
              구분
            </option>
            <option value="student">학생</option>
            <option value="professor">교수</option>
          </Select>
          <Input type="text" placeholder="이름 입력" />
        </Row>

        <LabelGroup>
          <span>학부</span>
        </LabelGroup>
        <Select defaultValue="">
          <option value="" disabled>
            학부
          </option>
          <option value="ee">전자공학과</option>
          <option value="cs">컴퓨터공학과</option>
          <option value="me">기계공학과</option>
        </Select>

        <LabelGroup>
          <span>학번/사번</span>
        </LabelGroup>
        <Input type="text" placeholder="학번/사번 입력" />

        <LabelGroup>
          <span>이메일</span>
        </LabelGroup>
        <Input type="email" placeholder="이메일 입력" />

        <LabelGroup>
          <span>전화번호</span>
        </LabelGroup>
        <Input type="tel" placeholder="전화번호 입력" />

        <Button type="submit">다음 페이지</Button>
      </Form>
    </SignupContainer>
  );
}

export default SignupPage;
