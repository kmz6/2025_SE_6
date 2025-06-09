import * as S from "../../styles/DashboardPage.style";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import WeeklySubmissionBarChart from "./Chart";
import { examPeriods } from "../../constants/event";

export default function RightList({
  assignments,
  isInExamPeriod,
  isInFestivalPeriod,
  date,
  selectedDate,
}) {
  const navigate = useNavigate();

  const dailyAssignments = assignments.filter(
    (a) => a.end_date?.slice(0, 10) === date
  );

  const currentExamLabel = examPeriods.find(
    (period) => date >= period.start && date <= period.end
  )?.label;

  return (
    <>
      <S.HeaderContainer>
        <h3>
          <S.HighlightedDate>{date}</S.HighlightedDate>
        </h3>
        <WeeklySubmissionBarChart
          assignments={assignments}
          selectedDate={selectedDate}
        />
      </S.HeaderContainer>

      {isInExamPeriod && (
        <S.ExamNotice>
          <span>{currentExamLabel} 시험기간</span>
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
        dailyAssignments.map((a) => (
          <S.AssignmentCard
            key={a.assignment_id}
            onClick={() => navigate(`/assignment/${a.course_id}`)}
          >
            <S.Subject>{a.course_name}</S.Subject>
            <S.Title>{a.assignment_title}</S.Title>
            <S.DateRange>
              {a.start_date.slice(0, 10)} ~ {a.end_date.slice(0, 10)}
            </S.DateRange>

            {a.submission_id ? (
              <S.SubmissionStatus>
                <FaCheckCircle style={{ marginRight: 6 }} />
                제출 완료
              </S.SubmissionStatus>
            ) : (
              <S.SubmissionRequired>
                <FaExclamationCircle style={{ marginRight: 6 }} />
                제출 필요!
              </S.SubmissionRequired>
            )}
          </S.AssignmentCard>
        ))
      )}
    </>
  );
}
