import * as S from "../../styles/DashboardPage.style";

export default function MemoModal({
  date,
  memoText,
  setMemoText,
  onClose,
  onSave,
}) {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalTitle>{date} 메모 작성</S.ModalTitle>
        <S.MemoTextarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder="메모를 입력하세요."
          autoFocus
        />
        <S.ModalButtonContainer>
          <S.ModalButton
            onClick={() => {
              setMemoText("");
              onClose();
            }}
          >
            취소
          </S.ModalButton>
          <S.ModalButton onClick={onSave}>저장</S.ModalButton>
        </S.ModalButtonContainer>
      </S.Modal>
    </S.ModalOverlay>
  );
}
