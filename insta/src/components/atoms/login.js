import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
`;
export const Main = styled.div`
  width: 350px;
`;
export const Box = styled.div`
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 10px;
`;
export const Logo = styled.img`
  margin: 22px 0 12px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 24px;
`;
export const InputText = styled.input`
  height: 36px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  padding-left: 8px;
  & + & {
    margin-top: 6px;
  }
`;
export const BtnSubmit = styled.button`
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: bold;
  margin: 8px 0;
`;
export const SignupWrapper = styled.div`
  padding: 15px 0;
  font-size: 14px;
`;
export const CustomLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #0095f6;
`;
