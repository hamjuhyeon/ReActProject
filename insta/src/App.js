import { useState } from "react";
import instance from "./apis";
import UserContext from "./contexts/user";
import Router from "./Router";

function App() {
  const { token } = localStorage;
  if (token) {
    instance.defaults.headers.common["authorization"] = token;
  }

  const [isLogin, setIsLogin] = useState(!!token);
  const value = {
    isLogin,
    setIsLogin: (val) => setIsLogin(val),
  };

  return (
    <UserContext.Provider value={value}>
      <Router />
    </UserContext.Provider>
  );
}

export default App;