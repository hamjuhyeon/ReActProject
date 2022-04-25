import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user";

const LoginCheck = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  return isLogin && <Outlet />;
};

export default LoginCheck;