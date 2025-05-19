import { useState } from "react";
import * as S from "./EditInfo.style";

const EditPassword = ({ onCancel, onSave, userCurrentPassword }) => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [currentPwdError, setCurrentPwdError] = useState("");
  const [newPwdError, setNewPwdError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");

  const validateAndSave = () => {
    let valid = true;

    if (!currentPwd) {
      setCurrentPwdError("현재 비밀번호를 입력해주세요.");
      valid = false;
    } else if (currentPwd !== userCurrentPassword) {
      setCurrentPwdError("현재 비밀번호가 올바르지 않습니다.");
      valid = false;
    } else {
      setCurrentPwdError("");
    }

    if (!newPwd) {
      setNewPwdError("새 비밀번호를 입력해주세요.");
      valid = false;
    } else {
      setNewPwdError("");
    }

    if (newPwd !== confirmPwd) {
      setConfirmPwdError("새 비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      setConfirmPwdError("");
    }

    if (!valid) return;
    onSave({ newPwd });
  };

  return (
    <S.Container>
      <S.FieldGroup>
        <S.Label>현재 비밀번호</S.Label>
        <S.Input
          type="password"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />
        {currentPwdError && <S.ErrorText>{currentPwdError}</S.ErrorText>}
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label>새로운 비밀번호</S.Label>
        <S.Input
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        {newPwdError && <S.ErrorText>{newPwdError}</S.ErrorText>}
      </S.FieldGroup>

      <S.FieldGroup>
        <S.Label>새로운 비밀번호 확인</S.Label>
        <S.Input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
        {confirmPwdError && <S.ErrorText>{confirmPwdError}</S.ErrorText>}
      </S.FieldGroup>

      <S.ButtonWrapper>
        <S.ConfirmButton onClick={validateAndSave}>저장</S.ConfirmButton>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default EditPassword;
