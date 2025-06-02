import * as S from "./EditInfo.style";
import { FiCheck } from "react-icons/fi";
import useEditInfoForm from "../../hooks/MyPage/useEditInfoForm";

const EditInfo = ({ initialPhone, initialEmail, onCancel, onSave }) => {
  const {
    phone,
    email,
    phoneError,
    emailError,
    handlePhoneChange,
    handleEmailChange,
    validate,
  } = useEditInfoForm(initialPhone, initialEmail);

  const validateAndSave = () => {
    if (!validate()) return;
    const rawPhone = phone.replace(/\D/g, "");
    onSave({ telephone: rawPhone, email });
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
          phone && (
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
          email && (
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
