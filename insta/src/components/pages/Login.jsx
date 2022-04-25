import { useState, useContext } from "react";
import styled from "styled-components";
import { postLoginToken } from "../../apis/user";
import instance from "../../apis";
import UserContext from "../../contexts/user";

import {
  PageWrapper,
  Main,
  Box,
  Logo,
  BtnSubmit,
  Form,
  InputText,
  SignupWrapper,
  CustomLink,
} from "../atoms/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ user_name: "", password: "" });
  const { user_name, password } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { message, success, token } = await postLoginToken(form);

    if (!success) return alert(message);

    alert("로그인 성공");

    instance.defaults.headers.common["authorization"] = token;
    localStorage.token = token;
    setIsLogin(true);
    navigate("/");
  };

  return (
    <PageWrapper>
      <Main>
        <Box>
          <Logo src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
          <Form onSubmit={handleSubmit}>
            <InputText
              value={user_name}
              name="user_name"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              onChange={handleChange}
            />
            <InputText
              value={password}
              name="password"
              placeholder="비밀번호"
              type="password"
              onChange={handleChange}
            />
            <BtnSubmit>로그인</BtnSubmit>
          </Form>
          <FBLogin>Facebook으로 로그인</FBLogin>
          <ForgotPassword>비밀번호를 잊으셨나요?</ForgotPassword>
        </Box>
        <Box>
          <SignupWrapper>
            계정이 없으신가요 <CustomLink to="/signup">가입하기</CustomLink>
          </SignupWrapper>
        </Box>
      </Main>
    </PageWrapper>
  );
};

const FBLogin = styled.div`
  color: #385185;
  font-weight: bold;
  font-size: 14px;
  margin-top: 30px;
`;
const ForgotPassword = styled.div`
  font-size: 12px;
  margin-top: 20px;
`;
export default Login;