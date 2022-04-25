import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../apis/upload";

import { getMyInfo, patchMyProfileImage, putMyInfo } from "../../apis/user";

const ProfileEdit = () => {
  const fileEl = useRef(null);
  const [form, setForm] = useState({
    memo: "",
    name: "",
    user_name: "",
  });
  const { memo, profile_image, name, user_name } = form;
  useEffect(() => {
    refreshInfo();
  }, []);

  const refreshInfo = async () => {
    const result = await getMyInfo();
    setForm(result.user);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const profile_image = await uploadImage(file);
    await patchMyProfileImage({ profile_image });
    refreshInfo();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    putMyInfo(form);
  };

  return (
    <Container>
      <SideMenu>
        <Menu>프로필 편집</Menu>
      </SideMenu>
      <Main>
        <Row>
          <Left>
            <ProfileImage src={profile_image} />
          </Left>
          <Right>
            <UserName>{user_name}</UserName>
            <BtnProfileImage onClick={() => fileEl.current.click()}>
              프로필 사진 바꾸기
            </BtnProfileImage>
            <input
              ref={fileEl}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </Right>
        </Row>
        <Row>
          <Left>이름</Left>
          <Right>
            <InputText
              value={name}
              required
              name="name"
              onChange={handleChange}
            />
          </Right>
        </Row>
        <Row>
          <Left>사용자 이름</Left>
          <Right>
            <InputText
              value={user_name}
              required
              name="user_name"
              onChange={handleChange}
            />
          </Right>
        </Row>
        <Row>
          <Left>소개</Left>
          <Right>
            <Textarea value={memo} name="memo" onChange={handleChange} />
          </Right>
        </Row>
        <Row>
          <Left></Left>
          <Right>
            <BtnSubmit onClick={handleSubmit}>제출</BtnSubmit>
          </Right>
        </Row>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
`;
const SideMenu = styled.div`
  width: 200px;
  border-right: 1px solid #ddd;
`;
const Menu = styled.div`
  padding: 50px;
`;
const Main = styled.div`
  flex: 1;
  padding: 50px;
  padding-right: 200px;
`;
const Row = styled.div`
  display: flex;
  margin: 20px 0;
`;
const Left = styled.div`
  text-align: right;
  width: 100px;
  font-weight: bold;
  margin-right: 30px;
  font-size: 16px;
  margin-top: 6px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const UserName = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const BtnProfileImage = styled.button`
  color: #0095f6;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
const InputText = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 7px 10px;
  box-sizing: border-box;
  font-size: 16px;
`;
const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  padding: 6px 10px;
`;
const BtnSubmit = styled.button`
  background-color: #0095f6;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

export default ProfileEdit;