import React from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect } from 'react';
import OpenViduSession from './OpenViduSession';
import styled from "styled-components";
import gameboard from '../../media/images/gameboard.png';
import loadingImage from '../../media/images/loadingImage.gif';

const OpenViduContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${gameboard});
  background-size: 100vw 100vh;
`;

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${loadingImage});
  background-size: 100vw 100vh;
`


// const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const OPENVIDU_SERVER_URL = 'https://' + 'i7e101.p.ssafy.io' + ':4443';
const OPENVIDU_SERVER_SECRET = 'e101ssafy71';

const OpenViduBlock = () => {
  // OV
  const [ov, setOv] = useState(null);
  const [mySessionId, setMySessionId] = useState('SessionDUDU');
  const [myUserName, setMyUserName] = useState('두두펭');
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // currentVideoDevice
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // componentDidMount() ==
  //  useEffect(() => { 여기에 코드를 적자  }, [])
  useEffect(() => {
    // 창 닫을때 session 떠나게 해줌
    window.addEventListener('beforeunload', onbeforeunload);
    // 게임 참여
    // console.log("값이있나", mySessionId, myUserName);
    joinSession();
    // WillUnmount()
    return window.removeEventListener('beforeunload', onbeforeunload);
  }, []);

  // useEffect(() => {
  //   console.log("세션아이디", mySessionId);
  //   console.log("세션", session);
  //   console.log("유저네임", myUserName);
  //   console.log("ov", ov);
  // }, [mySessionId, session, myUserName, ov]);

  const onbeforeunload = (e) => {
    leaveSession();
  };
  // 중앙에 오는놈을 설정하기 위한 아이(하위요소로 Props 필요함)
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let targetSubscribers = subscribers;
    let index = targetSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      targetSubscribers.splice(index, 1);
      setSubscribers(targetSubscribers);
    }
  };

  const joinSession = async () => {
    console.log(ov);
    // --- 1) Get an OpenVidu object ---
    // const temp = new OpenVidu();
    const tempOv = new OpenVidu();
    setOv(tempOv);
    console.log('아직반영X', ov);

    // --- 2) Init a session ---

    const tempSession = await tempOv.initSession();
    // setSession으로 하더라고 바로 못쓰고, 일단은 tempSession으로 가야함..
    // 다음 렌더링때 session이 업데이트됨
    setSession(tempSession);

    var mySession = tempSession;
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var tempSubscriber = mySession.subscribe(event.stream, undefined);
      var tempSubscribers = subscribers;
      tempSubscribers.push(tempSubscriber);

      // Update the state with the new subscribers
      setSubscribers(tempSubscribers);
    });

    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    getToken().then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          var devices = await tempOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let tempPublisher = tempOv.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(tempPublisher);

          // Set the main video in the page to display our webcam and store our Publisher

          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(tempPublisher);
          setPublisher(tempPublisher);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  };
  // 방 나갈 때 필요한 아이(하위요소로 PROPS 필요함)
  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOv(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMyUserName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };
  // 카메라 변경에 필요한 아이(하위요소로 PROPS 필요함)
  const switchCamera = async () => {
    try {
      const devices = await ov.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = ov.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);

          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */
  // join Session에 필요한 아이
  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
  };
  // join Session에 필요한 아이
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };
  // join Session에 필요한 아이
  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const mySessionIdValue = mySessionId;
  const myUserNameValue = myUserName;
  console.log("너 왜 없냐..", mySessionIdValue);
  console.log("너 왜 없냐.", myUserNameValue);

  // 방 참여 init

  return (
    <OpenViduContainer>
      {/* 그 입장하기 전에 화면 띄워줌 사실 필요없어서
        그냥 자동입장으로 일단 바꿈 */}
      {session === undefined ? (
        <LoadingBlock>
          <button onClick={()=>joinSession()}>참여하기</button>
        </LoadingBlock>
      ) : null}

      {/* 입장했으면.. */}
      {session !== undefined ? (
        <OpenViduSession
          handleMainVideoStream={handleMainVideoStream}
          switchCamera={switchCamera}
          leaveSession={leaveSession}
          mySessionIdValue={mySessionIdValue}
          mainStreamManager={mainStreamManager}
          publisher={publisher}
          subscribers={subscribers}
        >
        </OpenViduSession>
      ) : null}
    </OpenViduContainer>
  );
};

export default OpenViduBlock;
