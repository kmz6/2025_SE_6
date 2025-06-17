import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "회원가입이 완료되었습니다.") {
      navigate(`/login`);
    }
  };

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
      openModal("모든 항목을 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      openModal("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidPhone(phone)) {
      openModal("올바른 전화번호 형식이 아닙니다.");
      return;
    }

    if (!isValidEmail(email)) {
      openModal("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const pwError = isValidPassword(password);
    if (pwError) {
      openModal(pwError);
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
      openModal("회원가입이 완료되었습니다.");
    } catch (err) {
      console.error(err);
      openModal("회원가입에 실패하였습니다.");
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
            <option value="소프트웨어학부">소프트웨어학부</option>
            <option value="정보융합학부">정보융합학부</option>
            <option value="로봇학부">로봇학부</option>
            <option value="지능형로봇학과">지능형로봇학과</option>
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
}

export default SignupPage;