import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../utils/format";
import {
  isValidPhone,
  isValidEmail,
  isValidPassword,
} from "../utils/validation";
import { postSignup } from "../apis/signup/signup";
import * as S from "../styles/Signup.style";

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
    <S.Container>
      <S.Logo
        src="../images/1506.png"
        alt="로고"
        onClick={() => navigate("/login")}
      />
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Column>
          <S.LabelGroup><span>구분</span></S.LabelGroup>
          <S.Select defaultValue="">
            <option value="" disabled>구분</option>
            <option value="student">학생</option>
            <option value="faculty">교수</option>
          </S.Select>
          <S.LabelGroup><span>학부</span></S.LabelGroup>
          <S.Select defaultValue="">
            <option value="" disabled>학부</option>
            <option value="인공지능융합대학">인공지능융합대학</option>
            <option value="자연과학대학">자연과학대학</option>
            <option value="공과대학">공과대학</option>
            <option value="정책법학대학">정책법학대학</option>
          </S.Select>

          <S.LabelGroup><span>학과</span></S.LabelGroup>
          <S.Select defaultValue="">
            <option value="" disabled>학과</option>
            <option value="컴퓨터정보공학부">컴퓨터정보공학부</option>
            <option value="전자바이오물리학과">전자바이오물리학과</option>
            <option value="화학공학과">화학공학과</option>
            <option value="법학부">법학부</option>
          </S.Select>

          <S.LabelGroup><span>학번/사번</span></S.LabelGroup>
          <S.Input type="text" placeholder="학번/사번 입력" />

          <S.LabelGroup><span>이름</span></S.LabelGroup>
          <S.Input type="text" placeholder="이름 입력" />
        </S.Column>

        <S.Column>
          <S.LabelGroup><span>이메일</span></S.LabelGroup>
          <S.Input type="email" placeholder="이메일 입력" />

          <S.LabelGroup><span>전화번호</span></S.LabelGroup>
          <S.Input
            type="tel"
            placeholder="전화번호 입력"
            onChange={(e) => {
              e.target.value = formatPhoneNumber(e.target.value);
            }}
          />

          <S.LabelGroup><span>비밀번호</span></S.LabelGroup>
          <S.Input type="password" placeholder="비밀번호 입력" />

          <S.LabelGroup><span>비밀번호 확인</span></S.LabelGroup>
          <S.Input type="password" placeholder="비밀번호 확인" />
        </S.Column>

        <S.Button type="submit" style={{ width: '100%', marginTop: '20px' }}>
          회원가입 완료
        </S.Button>
      </S.Form>
    </S.Container>
  );
}

export default SignupPage;