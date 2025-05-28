import React, { useState } from "react";
import * as S from "../../styles/ManagementPage.style";
import { staffData } from "../../mocks/userData";

const DeleteMemberPage = () => {
  const [staffIdToDelete, setStaffIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    setStaffIdToDelete(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const staffExists = staffData.some(
      (staff) => staff.staff_id === staffIdToDelete.trim()
    );

    if (!staffExists) {
      setModalMessage(
        "해당 사번의 구성원이 존재하지 않습니다. 다시 입력해주세요."
      );
      setIsError(true);
      setShowModal(true);
      return;
    }

    console.log("삭제된 사번:", staffIdToDelete);

    setModalMessage("구성원이 삭제되었습니다.");
    setIsError(false);
    setShowModal(true);

    setStaffIdToDelete("");
  };

  return (
    <>
      <S.Container>
        <S.Title>구성원 삭제</S.Title>
        <form onSubmit={handleDelete}>
          <S.Table>
            <tbody>
              <S.Row>
                <S.CellHead>사번</S.CellHead>
                <S.Cell>
                  <input
                    type="text"
                    placeholder="삭제할 구성원의 사번을 입력하세요."
                    value={staffIdToDelete}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "8px",
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      fontFamily: "inherit",
                    }}
                    required
                    spellCheck={false}
                    autoComplete="off"
                  />
                </S.Cell>
              </S.Row>
            </tbody>
          </S.Table>
          <S.ButtonWrapper>
            <S.Button type="submit">구성원 삭제</S.Button>
          </S.ButtonWrapper>
        </form>
      </S.Container>

      {showModal && (
        <S.ModalOverlay>
          <S.Modal>
            <p style={{ color: isError ? "#d61c4e" : "black" }}>
              {modalMessage}
            </p>
            <S.ModalCloseButton onClick={() => setShowModal(false)}>
              닫기
            </S.ModalCloseButton>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default DeleteMemberPage;
