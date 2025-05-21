import { createContext, useContext, useState } from "react";

// context 생성
const UserContext = createContext(null);

// context 사용 훅
export const useUser = () => useContext(UserContext);

// context Provider
export const UserProvider = ({ children }) => {
  // 임시 로그인 정보 (나중엔 로그인 성공 시 setUser()로 갱신!)
  const [user, setUser] = useState({
    name: "농담곰",
    id: "2022202063",
    role: "professor", // 또는 "professor"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};