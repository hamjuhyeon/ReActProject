import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../apis/upload";

import { getMyInfo, patchMyProfileImage, putMyInfo } from "../../apis/user";

  
const MainRight = () => {
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
    <Right>
      <MyProfile>
        <MyProfileImage src={profile_image} />
        <MyProfileInfo>
          <MyProfileID>{user_name}</MyProfileID>
          <MyProfileName>{name}</MyProfileName>
        </MyProfileInfo>
      </MyProfile>
    </Right>
  );
};

const Right = styled.div`
  width: 293px;
  position: sticky;
  top: 80px;
  height: 140px;
`;

const MyProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 18px;
`;
const MyProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
`;
const MyProfileInfo = styled.div`
  margin-left: 12px;
`;
const MyProfileID = styled.div`
  font-weight: bold;
  color: #262626;
`;
const MyProfileName = styled.div`
  color: #8e8e8e;
`;

const Recommends = styled.div``;

const RecommendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8e8e8e;
  font-weight: 600;
  margin-top: 12px;
`;

export default MainRight;