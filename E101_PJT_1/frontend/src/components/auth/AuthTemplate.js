import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background from '../../media/images/StartPageImage.jpg'
import Formbackground from '../../media/images/Papyrus.png'

/**
 * 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */

/* 화면 전체를 채움 */
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;  
  background: url(${background}) no-repeat center;
  background-size: contain;
  /* flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  /* .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }   */
  /* padding: 2rem 0rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 100vh;
  /* border: 2px solid white; 자리확인용*/
  /* background: white; */
  background: url(${Formbackground}) no-repeat center;
  background-size: contain;  
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        {/* <div className="logo-area">
          <Link to="/">로고 자리..(홈으로 가기..)</Link>
        </div> */}
        { children }        
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;