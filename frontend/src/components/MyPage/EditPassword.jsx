import { useState } from "react";
import * as S from "./EditInfo.style";
import useEditPasswordForm from "../../hooks/MyPage/useEditPasswordForm";

const EditPassword = ({ onCancel, onSave, userCurrentPassword }) => {
  const {
    currentPwd,
    newPwd,
    confirmPwd,
    currentPwdError,
    newPwdError,
    confirmPwdError,
    setCurrentPwd,
    setNewPwd,
    setConfirmPwd,
    validate,
    setServerCurrentPwdError,
  } = useEditPasswordForm(userCurrentPassword);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateAndSave = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave({ currentPwd, newPwd });
    } catch (err) {
      if (
        err?.response?.data?.message === "현재 비밀번호가 일치하지 않습니다."
      ) {
        setServerCurrentPwdError("현재 비밀번호가 일치하지 않습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
        <S.ConfirmButton onClick={validateAndSave} disabled={isSubmitting}>
          저장
        </S.ConfirmButton>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default EditPassword;
