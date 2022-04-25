import styled from "styled-components";
import { ReactComponent as IconDirect } from "../../assets/images/direct.svg";
import { ReactComponent as IconActivity } from "../../assets/images/activity.svg";
import { ReactComponent as IconComment } from "../../assets/images/comment.svg";
import { ReactComponent as IconImoticon } from "../../assets/images/imoticon.svg";
import MainPostImageList from "./MainPostImageList";

const MainPostList = ({ data }) => {
  return (
    <List>
      {data.map(
        ({
          id,
          name,
          imageList,
          profile_image,
          likes = {},
          content,
          replys = { items: [] },
          created_at,
        }) => (
          <Post key={id}>
            <Header>
              <ProfileImage src={profile_image} />
              <HeaderContent>
                <UserName>{name}</UserName>
                <Location></Location>
              </HeaderContent>
              <BtnMore></BtnMore>
            </Header>
            <MainPostImageList data={imageList} />
            <ActionList>
              <BtnAction>
                <IconActivity />
              </BtnAction>
              <BtnAction>
                <IconComment />
              </BtnAction>
              <BtnAction>
                <IconDirect />
              </BtnAction>
            </ActionList>
            <Likes>좋아요 {likes.total}개</Likes>
            <Content>
              <UserName>{name}</UserName> {content}
            </Content>
            <CommentList>
              <TotalComments>댓글 {replys.total}개 모두보기</TotalComments>
              {replys.items.map(({ id, content, user: { name } }) => (
                <Comment key={id}>
                  <UserName>{name}</UserName> {content}
                </Comment>
              ))}
            </CommentList>
            <MetaData>{created_at}</MetaData>
            <CommentForm>
              <IconImoticonWrapper>
                <IconImoticon />
              </IconImoticonWrapper>
              <InputComment placeholder="댓글 달기..." />
              <BtnSubmit>게시</BtnSubmit>
            </CommentForm>
          </Post>
        )
      )}
    </List>
  );
};

const List = styled.div``;
const Post = styled.article`
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background: #fff;
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 12px;
`;
const UserName = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 600;
`;
const Location = styled.span``;
const BtnMore = styled.img``;

const ActionList = styled.div`
  padding: 6px 16px;
`;
const BtnAction = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
`;
const Likes = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 600;
  padding: 0 16px;
  margin-bottom: 8px;
`;
const Content = styled.div`
  padding: 0 16px;
  font-size: 14px;
  margin-bottom: 4px;
`;
const CommentList = styled.div`
  padding: 0 16px;
`;
const TotalComments = styled.p`
  color: #8e8e8e;
  margin: 0;
  margin-bottom: 4px;
  font-size: 14px;
`;
const Comment = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;
const MetaData = styled.time`
  color: #8e8e8e;
  font-size: 10px;
  margin-bottom: 16px;
  line-height: 18px;
  padding: 0 16px;
`;
const CommentForm = styled.form`
  border-top: 1px solid #efefef;
  padding: 6px 16px;
  display: flex;
  align-items: center;
`;
const IconImoticonWrapper = styled.div`
  padding: 8px 16px 8px 0;
`;
const InputComment = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
`;
const BtnSubmit = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0095f6;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`;
export default MainPostList;