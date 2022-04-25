import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../apis";
import UserContext from "../../contexts/user";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(UserContext);

  useEffect(() => {
    delete instance.defaults.headers.common["authorization"];
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;