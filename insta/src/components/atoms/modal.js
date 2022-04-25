import styled from "styled-components";

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

export const ModalContainer = styled.div`
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
`;