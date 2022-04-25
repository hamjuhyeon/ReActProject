import styled from "styled-components";

const MainShortsList = ({ data }) => {
  return (
    <Container>
      {data.map(({ id, user: { name, profileImage } }) => (
        <Shorts key={id}>
          <ProfileImage src={profileImage} />
          <Name>{name}</Name>
        </Shorts>
      ))}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #dbdbdb;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;
const Shorts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;
const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-bottom: 8px;
  margin-top: 4px;
`;
const Name = styled.span`
  letter-spacing: 0.01em;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 74px;
  display: inline-block;
  font-size: 12px;
`;

export default MainShortsList;