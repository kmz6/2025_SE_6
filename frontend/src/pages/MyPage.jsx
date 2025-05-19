import * as S from "./MyPage.style";
import { userData } from "../mocks/userData";
import { UserTableRows } from "../components/UserTableRows";

const MyPage = () => {
  const userType = userData.user_type;

  return (
    <S.Container>
      <S.Title>마이페이지</S.Title>
      <S.Table>
        <tbody>
          <UserTableRows userType={userType} />
        </tbody>
      </S.Table>

      <S.ButtonWrapper>
        <S.Button>개인정보 수정</S.Button>
        <S.Button>비밀번호 변경</S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default MyPage;
