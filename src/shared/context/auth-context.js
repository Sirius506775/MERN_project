import { createContext } from "react";

export const AuthContext = createContext({ //컴포넌트 간의 공유가 가능한 객체인 AuthContext
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
// 업데이트 시 이 객체를 수신하는 컴포넌트는 모두 업데이트

