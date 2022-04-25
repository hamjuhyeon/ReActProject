import { useRef, useState } from "react";
import styled from "styled-components";
import { Backdrop, ModalContainer } from "../../atoms/modal";
import { postPosts } from "../../../apis/post";
import { uploadImage } from "../../../apis/upload";

import { ReactComponent as IconMedia } from "../../../assets/images/media.svg";

const ModalAddPost = ({ onClose }) => {
  const fileEl = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [content, setContent] = useState("");

  const handleClick = () => {
    fileEl.current.click();
  };

  const handleFileChange = (e) => {
    const { files } = e.target;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageList((prev) => [...prev, { preview: reader.result, file }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // 1. 이미지들을 서버로 업로드해서 이미지 주소들을 받아온다.
    // 2. s3이미지 주소들을 content와 함께 서버로 보내서 새 post작성

    const promiseList = imageList.map(({ file }) => uploadImage(file));
    const fileList = await Promise.all(promiseList);

    postPosts({ fileList, content });
  };

  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <Header>
          새 게시물 만들기
          <BtnSubmit onClick={handleSubmit}>게시</BtnSubmit>
        </Header>
        {imageList.map(({ preview }) => (
          <img src={preview} key={preview} />
        ))}
        <Body>
          <IconMedia />
          <Guide>사진과 동영상을 여기에 끌어다 놓으세요</Guide>
          <Button onClick={handleClick}>컴퓨터에서 선택</Button>
          <InputFile
            ref={fileEl}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <Textarea onChange={handleContentChange} value={content} />
        </Body>
      </Container>
    </>
  );
};

const Container = styled(ModalContainer)`
  max-width: 664px;
  width: 70vw;
  height: 70vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const Header = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #dbdbdb;
  padding: 10px;
  text-align: center;
`;
const BtnSubmit = styled.button``;
const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Guide = styled.h3``;
const Button = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  border-radius: 4px;
  background-color: #0095f6;
  border: none;
  padding: 5px 9px;
  cursor: pointer;
`;
const InputFile = styled.input`
  display: none;
`;
const Textarea = styled.textarea``;
export default ModalAddPost;