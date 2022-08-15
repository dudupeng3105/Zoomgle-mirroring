import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import { useState, useEffect } from "react";
import styled from "styled-components";
import nameStone from '../../media/images/nameStone.png'

const StreamComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color:white;
  align-items: center;
  
  & video {
    width:10.5vmin;
    height:10.5vmin;
    /* padding-top: 25vmin;     */
    /* float: left; */
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;    
  }

  &.mainStreamer video{
    width: 40vw;
    height: 40vh;
    /* padding-top: 25vmin;     */
    /* float: left; */    
    cursor: initial;
    border-radius: 5%;
    
    border: 2px yellow solid;    
  }

  &.waiting video{
    width: 25vw;
    height: 25vh;
    /* margin-bottom: 4vh; */
    border-radius: 5%;  
  }

  &.mvpshow video {
    width: 15vw;
    height: 25vh;
    border-radius: 50%;  
  }
`

const NickNameBox = styled.div`
  position: absolute;  
  bottom: -2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 5vh;
  background: url(${nameStone});
  background-size: 5vw 5vh;    
  font-size: 1.8vmin;
  color: yellow;  
  &.waiting {
    background: url(${nameStone});
    background-size: 10vw 4vh;
    bottom: 0;
    font-size: 4vmin;
    width: 10vw;
    height: 4vh;
    border-radius: 5px;
  }
`

const UserVideoComponent = ({ streamManager, mainStreamer, status }) => {
  const [userNickname, setUserNickname] = useState("");
  console.warn(streamManager);
  const getNicknameTag = (streamManager) => {
    // console.warn("안녕", streamManager.stream);
    const nickname = JSON.parse(
      streamManager.stream.connection.data
    ).clientData;
    // console.warn("안녕닉네임", nickname);
    setUserNickname(nickname);
  };

  useEffect(() => {
    getNicknameTag(streamManager);    
  }, []);
  

  return (
    <div>
      {streamManager !== undefined ? (
        <StreamComponent className={status}>
          <OpenViduVideoComponent streamManager={streamManager}/>
          <NickNameBox className={status}>{userNickname}</NickNameBox>          
        </StreamComponent>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
