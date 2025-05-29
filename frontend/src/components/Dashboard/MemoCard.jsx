import * as S from "../../styles/DashboardPage.style";

export default function MemoCard({ memo, onDelete }) {
  const date = new Date(memo.createdAt);

  const formattedDateTime = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  return (
    <S.MemoCard backgroundColor={memo.backgroundColor}>
      <S.MemoDeleteButton onClick={() => onDelete(memo.id)}>
        ×
      </S.MemoDeleteButton>
      <S.MemoDate>{formattedDateTime}</S.MemoDate>
      <S.MemoContent>{memo.content}</S.MemoContent>
    </S.MemoCard>
  );
}
