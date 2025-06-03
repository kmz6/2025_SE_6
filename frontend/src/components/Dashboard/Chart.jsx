import * as S from "./Chart.style";
import { calculateWeeklySubmissionStats } from "../../utils/stats";

export default function WeeklySubmissionBarChart({
  assignments,
  selectedDate,
}) {
  const { total, submitted, percent } = calculateWeeklySubmissionStats(
    assignments,
    selectedDate
  );

  return (
    <S.BarContainer>
      <S.BarTopRow>
        <S.BarLabel>이번 주 과제 제출 현황</S.BarLabel>
        <S.BarBackground>
          <S.BarFill width={percent} />
        </S.BarBackground>
      </S.BarTopRow>
      <S.PercentLabel>
        {submitted} / {total} 과제 제출 완료 ({percent}%)
      </S.PercentLabel>
    </S.BarContainer>
  );
}
