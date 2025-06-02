import React, { useState } from "react";
import * as S from "../../styles/ManagementPage.style";
import useEditInfoForm from "../../hooks/MyPage/useEditInfoForm";
import { postMember } from "../../apis/management/management";

const AddMemberPage = () => {
  const [formData, setFormData] = useState({
    staff_id: "",
    name: "",
    department: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [touched, setTouched] = useState({
    phone: false,
    email: false,
  });

  const {
    phone,
    email,
    phoneError,
    emailError,
    handlePhoneChange,
    handleEmailChange,
    validate,
  } = useEditInfoForm("", "");

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const onPhoneChange = (e) => {
    setTouched((prev) => ({ ...prev, phone: true }));
    handlePhoneChange(e.target.value);
  };

  const onEmailChange = (e) => {
    setTouched((prev) => ({ ...prev, email: true }));
    handleEmailChange(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      ...formData,
      telephone: phone,
      email: email,
    };

    try {
      await postMember(submitData);
      setFormData({
        staff_id: "",
        name: "",
        department: "",
      });
      handlePhoneChange("");
      handleEmailChange("");
      setTouched({ phone: false, email: false });
      setShowSuccessModal(true);
    } catch (error) {
      console.error("구성원 추가 실패:", error);
      if (error?.response?.status === 400) {
        setShowModal(true);
      }
    }
  };

  const renderCell = (field, placeholder) => (
    <S.Cell>
      <input
        type="text"
        name={field}
        placeholder={placeholder}
        value={formData[field]}
        onChange={handleInputChange(field)}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          padding: "8px",
          direction: "ltr",
          textAlign: "left",
          fontSize: "1rem",
          backgroundColor: "transparent",
          fontFamily: "inherit",
        }}
        required
        spellCheck={false}
        autoComplete="off"
      />
    </S.Cell>
  );

  return (
    <>
      <S.Container>
        <S.Title>구성원 추가</S.Title>
        <form onSubmit={handleSubmit}>
          <S.Table>
            <tbody>
              <S.Row>
                <S.CellHead>사번</S.CellHead>
                {renderCell("staff_id", "사번을 입력하세요.")}
              </S.Row>
              <S.Row>
                <S.CellHead>이름</S.CellHead>
                {renderCell("name", "이름을 입력하세요.")}
              </S.Row>
              <S.Row>
                <S.CellHead>소속</S.CellHead>
                {renderCell("department", "소속을 입력하세요.")}
              </S.Row>
              <S.Row>
                <S.CellHead>연락처</S.CellHead>
                <S.Cell
                  style={{
                    position: "relative",
                    paddingBottom: touched.phone && phoneError ? "24px" : "0",
                  }}
                >
                  <input
                    type="text"
                    placeholder="연락처를 입력하세요."
                    value={phone}
                    onChange={onPhoneChange}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "8px",
                      direction: "ltr",
                      textAlign: "left",
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    required
                  />
                  {touched.phone && phoneError && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 14,
                        color: "red",
                        fontSize: "0.875rem",
                      }}
                    >
                      {phoneError}
                    </div>
                  )}
                </S.Cell>
              </S.Row>

              <S.Row>
                <S.CellHead>이메일</S.CellHead>
                <S.Cell
                  style={{
                    position: "relative",
                    paddingBottom: touched.email && emailError ? "24px" : "0",
                  }}
                >
                  <input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    value={email}
                    onChange={onEmailChange}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "8px",
                      direction: "ltr",
                      textAlign: "left",
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      fontFamily: "inherit",
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    required
                  />
                  {touched.email && emailError && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 14,
                        color: "red",
                        fontSize: "0.875rem",
                      }}
                    >
                      {emailError}
                    </div>
                  )}
                </S.Cell>
              </S.Row>
            </tbody>
          </S.Table>
          <S.ButtonWrapper>
            <S.Button type="submit">구성원 추가</S.Button>
          </S.ButtonWrapper>
        </form>
      </S.Container>

      {showModal && (
        <S.ModalOverlay>
          <S.Modal>
            이미 등록된 사번입니다.
            <S.ModalCloseButton onClick={() => setShowModal(false)}>
              닫기
            </S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}

      {showSuccessModal && (
        <S.ModalOverlay>
          <S.Modal>
            구성원이 성공적으로 추가되었습니다.
            <S.ModalCloseButton onClick={() => setShowSuccessModal(false)}>
              닫기
            </S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default AddMemberPage;
