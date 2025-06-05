import { useState, useEffect } from "react";
import * as S from "../styles/MyPage.style";
import { UserTableRows } from "../components/MyPage/UserTableRows";
import { useParams } from "react-router-dom";
import { getMyInfo } from "../apis/my/my";

const MyPage = () => {
  const { userId } = useParams();
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userType, userInfo } = await getMyInfo(userId);
        setUserType(userType);
        setUserInfo(userInfo);
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err.message);
        setUserInfo(null);
      }
    };
    fetchData();
  }, [userId]);

  if (!userInfo) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <S.Container>
      <S.Title>마이페이지</S.Title>

      <S.Table>
        <tbody>
          <UserTableRows userType={userType} userInfo={userInfo} />
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default MyPage;
