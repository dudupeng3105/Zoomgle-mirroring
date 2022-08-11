import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StreamComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color:white;
  align-items: center;
  
  & video {
    width:10vmin;
    height:10vmin;
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
    border-radius: 5%;  
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
          <p>{userNickname}</p>          
        </StreamComponent>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
