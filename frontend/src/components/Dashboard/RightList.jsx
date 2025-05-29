import * as S from "../../styles/DashboardPage.style";
import { useNavigate } from "react-router-dom";

export default function RightList({
  assignments,
  isInExamPeriod,
  isInFestivalPeriod,
  date,
}) {
  const navigate = useNavigate();

  return (
    <>
      <h3>
        <S.HighlightedDate>{date}</S.HighlightedDate>
      </h3>
      {isInExamPeriod && (
        <S.ExamNotice>
          <span>기말고사 시험기간</span>
        </S.ExamNotice>
      )}
      {isInFestivalPeriod && (
        <S.FestivalNotice>
          <span>학교 축제기간</span>
        </S.FestivalNotice>
      )}

      {assignments.length === 0 && !isInExamPeriod && !isInFestivalPeriod ? (
        <p>해당 날짜에 일정이 없습니다.</p>
      ) : (
        assignments.map((a) => (
          <S.AssignmentCard
            key={a.id}
            onClick={() => navigate(`/assignments/${a.id}`)}
          >
            <S.Subject>{a.subject}</S.Subject>
            <S.Title>{a.title}</S.Title>
            <S.DateRange>
              {a.startDate} ~ {a.dueDate}
            </S.DateRange>
          </S.AssignmentCard>
        ))
      )}
    </>
  );
}
