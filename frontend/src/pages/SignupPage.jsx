import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../utils/format";
import {
  isValidPhone,
  isValidEmail,
  isValidPassword,
} from "../utils/validation";
import { postSignup } from "../apis/signup/signup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Pretendard", sans-serif;
  background-color: #fff;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 700px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const LabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  flex: 1;
  height: auto;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  line-height: normal;
  box-sizing: border-box;
`;

const Select = styled.select`
  flex: 1;
  height: auto;
  padding: 8px;
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const user_type = form[0].value;
    const college = form[1].value;
    const department = form[2].value;
    const user_id = form[3].value;
    const name = form[4].value;
    const email = form[5].value;
    const phone = form[6].value;
    const password = form[7].value;
    const confirmPassword = form[8].value;

    if (!user_type || !college || !department || !user_id || !name || !email || !phone || !password || !confirmPassword) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const pwError = isValidPassword(password);
    if (pwError) {
      alert(pwError);
      return;
    }
    try {
      const res = await postSignup({
        user_id,
        password,
        user_type,
        name,
        college,
        department,
        telephone: phone,
        email,
        enrollment_status: user_type === "student" ? "enrolled" : undefined,
      });

      alert(res.message);
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("회원가입 실패!");
    }
  };

  return (
    <Container>
      <Logo
        src="../images/1506.png"
        alt="로고"
        onClick={() => navigate("/login")}
      />
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Column>
          <LabelGroup><span>구분</span></LabelGroup>
          <Select defaultValue="">
            <option value="" disabled>구분</option>
            <option value="student">학생</option>
            <option value="professor">교수</option>
          </Select>
          <LabelGroup><span>학부</span></LabelGroup>
          <Select defaultValue="">
            <option value="" disabled>학부</option>
            <option value="engineering">공과대학</option>
            <option value="science">자연과학대학</option>
            <option value="business">경영대학</option>
          </Select>

          <LabelGroup><span>학과</span></LabelGroup>
          <Select defaultValue="">
            <option value="" disabled>학과</option>
            <option value="ee">전자공학과</option>
            <option value="cs">컴퓨터공학과</option>
            <option value="me">기계공학과</option>
            <option value="ba">경영학과</option>
          </Select>

          <LabelGroup><span>학번/사번</span></LabelGroup>
          <Input type="text" placeholder="학번/사번 입력" />

          <LabelGroup><span>이름</span></LabelGroup>
          <Input type="text" placeholder="이름 입력" />
        </Column>

        <Column>
          <LabelGroup><span>이메일</span></LabelGroup>
          <Input type="email" placeholder="이메일 입력" />

          <LabelGroup><span>전화번호</span></LabelGroup>
          <Input
            type="tel"
            placeholder="전화번호 입력"
            onChange={(e) => {
              e.target.value = formatPhoneNumber(e.target.value);
            }}
          />

          <LabelGroup><span>비밀번호</span></LabelGroup>
          <Input type="password" placeholder="비밀번호 입력" />

          <LabelGroup><span>비밀번호 확인</span></LabelGroup>
          <Input type="password" placeholder="비밀번호 확인" />
        </Column>

        <Button type="submit" style={{ width: '100%', marginTop: '20px' }}>
          회원가입 완료
        </Button>
      </Form>
    </Container>
  );
}

export default SignupPage;