import React from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect } from 'react';
import OpenViduSession from './OpenViduSession';
import styled from "styled-components";
import gameboard from '../../media/images/gameboard.png';
import loadingImage from '../../media/images/loadingImage.gif';
import { nextDay } from 'date-fns';

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
  const [myUserName, setMyUserName] = useState(`펭두두-${Math.floor(Math.random() * 100) + 1}`);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // currentVideoDevice
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);  
  // 
  // 게임관련 변수들
  const [players, setPlayers] = useState([]); // 플레이어들
  const [turnNum, setTurnNum] = useState(0); // 몇 번째 사람 차례인지(이번 턴 인 사람)
  const [nextPlayer, setNextPlayer] = useState('') // 다음 사람(handlemainStreamer에 사용)
  const [posList, setPosList] = useState([0, 0, 0, 0, 0, 0]); // 6명 max라 생각하고 각자의 포지션
  const [vote, setVote] = useState([]); // 누가 뭘로 투표했는지
  const [minigameResult , setMinigameResult] = useState(undefined);  // 미니게임 결과(통과, 실패)
  const [minigameDone, setMinigameDone] = useState(false); // 미니게임이 끝났는지
  const [isRoll, setIsRoll] = useState(false); // 굴렸는지
  const [isVote, setIsVote] = useState(false); // 투표했는지

  

  // componentDidMount() ==
  //  useEffect(() => { 여기에 코드를 적자  }, [])
  useEffect(() => {
    // 창 닫을때 session 떠나게 해줌
    window.addEventListener('beforeunload', onbeforeunload);
        
    // 게임 참여
    // console.error("아이디 뭐냐", myUserName)
    // joinSession();

    // WillUnmount()
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  useEffect(() => {
    console.error("구성원바뀜",players);
  }, [players]);
  
  // 중앙에 오는놈을 설정하기 위한 아이(하위요소로 Props 필요함)
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // 나갈 때 작동함
  const deleteSubscriber = (streamManager) => {    
    let targetSubscribers = subscribers;
    let index = targetSubscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(targetSubscribers[index].stream.connection.data).clientData;
    console.error("제거할 이름", removeName);

    if (index > -1) {
      targetSubscribers.splice(index, 1);      
      setSubscribers(targetSubscribers);
    }
    let tempPlayers = targetSubscribers.map((tempsub) => JSON.parse(tempsub.stream.connection.data).clientData)
    console.error("나간 후 리스트", tempPlayers); 
    // 자기 자신 없으면 넣어야함
    if (tempPlayers.includes(myUserName) === false) {
      tempPlayers.push(myUserName);
    }
    setPlayers(tempPlayers.sort());
  };

  // 들어올 때
  const joinSession = async () => {    
    // --- 1) Get an OpenVidu object ---
    // const temp = new OpenVidu();
    const tempOv = new OpenVidu();
    setOv(tempOv);    

    // --- 2) Init a session ---

    const tempSession = await tempOv.initSession();
    // setSession으로 하더라고 바로 못쓰고, 일단은 tempSession으로 가야함..
    // 다음 렌더링때 session이 업데이트됨
    setSession(tempSession);

    var mySession = tempSession;

    // --- 3) Specify the actions when events take place in the session ---
     // 게임 참여자 목록
    // On every new Stream received...(새로운 사람이 들어올 때 마다...)
    mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var tempSubscriber = mySession.subscribe(event.stream, undefined); // 새로운 참여자
      var tempSubscribers = subscribers; // 참여자 목록(많은 정보 담고 있음)   
      // 리액트에서 배열을 다른 변수에 바로 대입하는것은 참조되기 때문에 state가 즉각 변하지 않음
      // 참고: https://stackoverflow.com/questions/25937369/react-component-not-re-rendering-on-state-change
      // var tempPlayers = players; (이 방법은 잘못됨)
      // console.error("플레이어는", players);
      // let tempPlayers = [...players]; // 배열복사를 활용하자!!
      // console.error("추가전", tempPlayers);
      const addUserName = JSON.parse(tempSubscriber.stream.connection.data).clientData;
      console.error("이름은", addUserName);
      tempSubscribers.push(tempSubscriber);
      // tempPlayers.push(addUserName);

      let tempPlayers = tempSubscribers.map((tempsub) => JSON.parse(tempsub.stream.connection.data).clientData)

      // 자기 자신 없으면 넣어야함
      if (tempPlayers.includes(myUserName) === false) {
        tempPlayers.push(myUserName);
      }

      console.error("한명더들어왔어요!", tempPlayers);
      // Update the state with the new subscribers
      setSubscribers(tempSubscribers);     
      setPlayers(tempPlayers.sort());
    });

    // On every Stream destroyed... (누가 나갈 때 마다)
    mySession.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 주사위 동기화 ON
    mySession.on('GAME_STATE_CHANGED', (data) => {
      console.warn("시그널 왔다 받아라..", players);           
      const {isRoll, nextPosList} = JSON.parse(data.data);      
      setPosList(nextPosList);
      setIsRoll(isRoll); // 주사위 돌렸다는 것이 미니게임의 시작을 알림
    });

    // 미니게임 결과 동기화 ON
    mySession.on('MINIGAME_STATE_CHANGED', (data) => {
      console.warn("미니게임끝났다 받아라..");      
      const {nextTurn, nextIsRoll, nextUserName} = JSON.parse(data.data);
      setNextPlayer(nextUserName);
      setTurnNum(nextTurn);
      setVote([]); // Vote 초기화
      setIsRoll(nextIsRoll); // isRoll이 다시 false 됐다는 것은 미니게임이 끝
      // 났다는 것임
    });

    // 투표 진행 동기화 ON
    mySession.on('VOTE_STATE_CHANGED', (data) => {
      console.warn("투표상황 업데이트..");      
      const {nextVote} = JSON.parse(data.data);
      setVote([...nextVote]);
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
          // 이름만 뽑아냄
          // const publisherName = JSON.parse(tempPublisher.stream.connection.data).clientData; 
          // console.log("퍼블리셔이름", publisherName)   
          // tempPlayers.push(publisherName);               
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(tempPublisher);
          setPublisher(tempPublisher);
          // setPlayers(tempPlayers);
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

  const onbeforeunload = (e) => {    
    leaveSession();    
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
          <h1>내 이름 뭐로 되어있냐?{myUserName}</h1>
          <button onClick={()=>joinSession()}>참여하기</button>
        </LoadingBlock>
      ) : null}

      {/* 입장했으면.. */}
      {session !== undefined ? (
        <OpenViduSession
          nextPlayer={nextPlayer}
          setNextPlayer={setNextPlayer}
          isRoll={isRoll}
          setIsRoll={setIsRoll}
          isVote={isVote}
          setIsVote={setIsVote}
          vote={vote}
          setVote={setVote}
          minigameResult={minigameResult}
          setMinigameResult={setMinigameResult}
          minigameDone={minigameDone}
          setMinigameDone={setMinigameDone}
          turnNum={turnNum}
          setTurnNum={setTurnNum}
          posList={posList}
          setPosList={setPosList}
          session={session}
          handleMainVideoStream={handleMainVideoStream}
          switchCamera={switchCamera}
          leaveSession={leaveSession}
          mySessionIdValue={mySessionIdValue}
          myUserNameValue={myUserNameValue}
          mainStreamManager={mainStreamManager}
          publisher={publisher}
          players={players}
          subscribers={subscribers}
        >
        </OpenViduSession>        
      ) : null}
    </OpenViduContainer>
  );
};

export default OpenViduBlock;
