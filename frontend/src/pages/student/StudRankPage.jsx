import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import { getRank } from "../../apis/grade/studRank";
import * as S from "../../styles/StudRankPage.style";

const StudRankPage = () => {
  const { user } = useUser(); // user 정보

  const [rankData, setRankData] = useState([]); // 석차 정보

  // 석차 정보 불러오기
  useEffect(() => {
    if (!user) return; //user 없어도 계속 hook 호출

    const fetchRankData = async () => {
      // 석차 정보 불러오기
      const ranks = await getRank(user.user_id);
      setRankData(ranks);
    };
    fetchRankData();
  }, [user]);

  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.Container>
      <S.Title>학습 결과</S.Title>
      <S.SubTitle>기본 정보</S.SubTitle>
      <StudInfo user_id={user.user_id}></StudInfo>

      <S.SubTitle>석차 조회</S.SubTitle>
      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>학기</S.CellHead>
            <S.CellHead>신청학점</S.CellHead>
            <S.CellHead>평점</S.CellHead>
            <S.CellHead>학과석차</S.CellHead>
          </S.Row>
        </thead>
        <tbody>
          {rankData.map((rank) => (
            <S.Row key={rank.semester}>
              <S.Cell>{rank.semester}</S.Cell>
              <S.Cell>{rank.totalCredits}</S.Cell>
              <S.Cell>{rank.gpa}</S.Cell>
              <S.Cell>{rank.rank}</S.Cell>
            </S.Row>
          ))}
        </tbody>
      </S.Table>
    </S.Container >
  );
};

export default StudRankPage;
