import { useState, useEffect } from "react";
import { isValidPhone, isValidEmail } from "../../utils/validation";
import { formatPhoneNumber } from "../../utils/format";

const useEditInfoForm = (initialPhone, initialEmail) => {
  const [phone, setPhone] = useState(formatPhoneNumber(initialPhone));
  const [email, setEmail] = useState(initialEmail);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handlePhoneChange = (input) => {
    const raw = input.replace(/\D/g, "");
    if (raw.startsWith("02") && raw.length > 9) return;
    if (raw.startsWith("010") && raw.length > 11) return;
    setPhone(formatPhoneNumber(input));
  };

  const handleEmailChange = (input) => {
    setEmail(input);
  };

  // 실시간 검증
  useEffect(() => {
    const rawPhone = phone.replace(/\D/g, "");
    if (!rawPhone) {
      setPhoneError("전화번호를 입력해주세요.");
    } else if (!isValidPhone(rawPhone)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다.");
    } else {
      setPhoneError("");
    }
  }, [phone]);

  useEffect(() => {
    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!isValidEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  }, [email]);

  const validate = () => {
    const rawPhone = phone.replace(/\D/g, "");
    let valid = true;

    if (!rawPhone) {
      setPhoneError("전화번호를 입력해주세요.");
      valid = false;
    } else if (!isValidPhone(rawPhone)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다.");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      valid = false;
    }

    return valid;
  };

  return {
    phone,
    email,
    phoneError,
    emailError,
    handlePhoneChange,
    handleEmailChange,
    validate,
  };
};

export default useEditInfoForm;
