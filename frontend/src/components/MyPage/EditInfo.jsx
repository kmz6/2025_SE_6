import { useState } from "react";
import * as S from "./EditInfo.style";
import { isValidPhone, isValidEmail } from "../../utils/validation";
import { formatPhoneNumber } from "../../utils/format";
import { FiCheck } from "react-icons/fi";

const EditInfo = ({ initialPhone, initialEmail, onCancel, onSave }) => {
  const [phone, setPhone] = useState(formatPhoneNumber(initialPhone));
  const [email, setEmail] = useState(initialEmail);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 전화번호 변경시 실시간 검증 및 상태 업데이트
  const handlePhoneChange = (input) => {
    const raw = input.replace(/\D/g, "");
    if (raw.startsWith("02") && raw.length > 9) return;
    if (raw.startsWith("010") && raw.length > 11) return;

    setPhone(formatPhoneNumber(input));

    if (!raw) {
      setPhoneError("전화번호를 입력해주세요.");
      setIsPhoneValid(false);
    } else if (!isValidPhone(raw)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다.");
      setIsPhoneValid(false);
    } else {
      setPhoneError("");
      setIsPhoneValid(true);
    }
  };

  // 이메일 변경시 실시간 검증 및 상태 업데이트
  const handleEmailChange = (input) => {
    setEmail(input);

    if (!input.trim()) {
      setEmailError("이메일을 입력해주세요.");
      setIsEmailValid(false);
    } else if (!isValidEmail(input)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const validateAndSave = () => {
    const rawPhone = phone.replace(/\D/g, "");
    let valid = true;

    if (!rawPhone) {
      setPhoneError("전화번호를 입력해주세요.");
      valid = false;
    } else if (!isValidPhone(rawPhone)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) return;
    onSave({ phone: rawPhone, email });
  };

  return (
    <S.Container>
      <S.FieldGroup>
        <S.Label>전화번호</S.Label>
        <S.Input
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
        {phoneError ? (
          <S.ErrorText>{phoneError}</S.ErrorText>
        ) : (
          isPhoneValid && (
            <FiCheck
              style={{
                color: "green",
                marginLeft: 8,
                marginTop: 6,
                fontSize: 16,
              }}
            />
          )
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label>이메일</S.Label>
        <S.Input
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        {emailError ? (
          <S.ErrorText>{emailError}</S.ErrorText>
        ) : (
          isEmailValid && (
            <FiCheck
              style={{
                color: "green",
                marginLeft: 8,
                marginTop: 6,
                fontSize: 16,
              }}
            />
          )
        )}
      </S.FieldGroup>

      <S.ButtonWrapper>
        <S.ConfirmButton onClick={validateAndSave}>저장</S.ConfirmButton>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default EditInfo;
