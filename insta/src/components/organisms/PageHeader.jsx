import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

import { ModalAddPost } from "../organisms/modals";

import { ReactComponent as IconHome } from "../../assets/images/home.svg";
import { ReactComponent as IconSearch } from "../../assets/images/search.svg";
import { ReactComponent as IconDirect } from "../../assets/images/direct.svg";
import { ReactComponent as IconNewPost } from "../../assets/images/new-post.svg";
import { ReactComponent as IconExplore } from "../../assets/images/explore.svg";
import { ReactComponent as IconActivity } from "../../assets/images/activity.svg";

import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../apis/upload";

import { getMyInfo, patchMyProfileImage, putMyInfo } from "../../apis/user";


const PageHeader = () => {
  const fileEl = useRef(null);
  const [form, setForm] = useState({
    memo: "",
    name: "",
    user_name: "",
  });
  const { memo, profile_image} = form;
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


  const [showModalAddPost, setShowModalAddPost] = useState(false);
  return (
    <>
      <Header>
        <Main>
          <Link to="/">
            <ImgLogo src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
          </Link>
          <SearchWrapper>
            <IconSearch />
            <SearchInput placeholder="검색" />
          </SearchWrapper>

          <Nav>
            <IconWrapper>
              <IconHome />
            </IconWrapper>
            <IconWrapper>
              <IconDirect />
            </IconWrapper>
            <IconWrapper onClick={() => setShowModalAddPost(true)}>
              <IconNewPost />
            </IconWrapper>
            <IconWrapper>
              <IconExplore />
            </IconWrapper>
            <IconWrapper>
              <IconActivity />
            </IconWrapper>
            <IconWrapper>
              <Link to="/profile/edit">
                <ProfileImage src={profile_image} />
              </Link>
            </IconWrapper>
          </Nav>
        </Main>
      </Header>

      <OutletWrapper>
        <Outlet />
      </OutletWrapper>

      {showModalAddPost && (
        <ModalAddPost onClose={() => setShowModalAddPost(false)} />
      )}
    </>
  );
};

const Header = styled.header`
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;
const Main = styled.div`
  max-width: 975px;
  box-sizing: border-box;
  padding: 0 20px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ImgLogo = styled.img`
  width: 103px;
  vertical-align: bottom;
`;

const SearchWrapper = styled.div`
  background: #efefef;
  font-size: 16px;
  padding: 0 16px;
  height: 36px;
  min-width: 125px;
  width: 268px;
  display: flex;
  align-items: center;
  border-radius: 8px;
`;
const SearchInput = styled.input`
  background: none;
  border: none;
  flex: 1;
  outline: none;
  margin-left: 12px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  & + & {
    margin-left: 22px;
  }
`;

const OutletWrapper = styled.main`
  max-width: 935px;
  margin: 0 auto;
  padding: 15px 0;
  margin-top: 60px;
`;
export default PageHeader;