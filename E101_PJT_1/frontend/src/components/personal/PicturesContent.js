import styled from "styled-components";
import background from '../../media/images/albumSmaller.png'
import { useDispatch, useSelector} from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";
import { useEffect, useState } from "react";
import arrowRight from "../../media/images/arrowRight.png";
import arrowLeft from "../../media/images/arrowLeft.png";

const PicturesContentBlock = styled.div`
  width: 83vw;
  height: 100vh;
  background: url(${background}) no-repeat center;
  background-size: 83vw 100vh;
  padding-left: 3vw;
`;

const GameDayInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 75vw;
  margin-top: 8vh;
  font-size: 4vmin;
  color: #412E22;
  & p {
    font-size: 5vmin;
  }
`

const GamePlayerInfo = styled.div`
  width: 73vw;
  height: 5vh;
  display: flex;
  margin-left: 1vw;
  align-items: center;
  background-color: transparent;
  /* border: 1px solid blue;   */
  justify-content: space-between;    
  font-size: 5vmin;
  color: #412E22;
`

const GameDoneBoard = styled.div`
  width: 73vw;
  height: 70vh;
  margin-left: 1vw;
  background-color: transparent;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
`

const BlankText = styled.div`
  margin-top: 20vh;
  width: 73vw;
  height: 50vh;
  font-size: 10vmin;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GameDoneImg = styled.div`
  width: 23vw;  
  height: 25vh;
  margin-top: 4vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 23vw 25vh; 
  border: 1px solid black;
  border-radius: 5px;  
`

const ArrowBtn = styled.div`
  width: 30vw;
  height: 10vh;
  cursor: pointer;  
  /* border: 1px solid black; */
  background:  ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 20vw 8vh;
`

const BlankPhotoText = styled.div`
  width: 73vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7vmin;
`

const PicturesContent = () => {
  const dispatch = useDispatch();
  const [planIdx, setPlanIdx] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);

  const gameDoneList = useSelector((state) => state.gamePlan.gameDoneList);
  const gameDonePhoto = useSelector((state) => state.gamePlan.gameDonePhoto);
  // 첫 렌더링시 디스패치
  useEffect(() => {
    dispatch(gamePlanActions.getGameDoneListStart())
  }, []);

  // 리스트 받아올때 마다
  useEffect(() => {
    if (gameDoneList.length === 0){
      return;
    } else {
      dispatch(gamePlanActions.getGameDonePhotoStart(gameDoneList[0].roomCode))
      const temp  = gameDoneList[0].playerList.map((player) => player.user)
      setPlayerNames([...temp]);
    }    
  }, [gameDoneList]);
  
  // 인덱스 변경 시
  useEffect(() => {
    if (gameDoneList.length === 0){
      return;
    } else {
      dispatch(gamePlanActions.getGameDonePhotoStart(gameDoneList[planIdx].roomCode))
      const temp  = gameDoneList[planIdx].playerList.map((player) => player.user)
      setPlayerNames([...temp]);
    }    
  }, [planIdx]);

  const onClickLeft = () => {
    if (planIdx === 0) {
      setPlanIdx(gameDoneList.length - 1)
    } else {
      setPlanIdx(planIdx - 1)
    }
  }

  const onClickRight = () => {
    if (planIdx === gameDoneList.length - 1) {
      setPlanIdx(0)
    } else {
      setPlanIdx(planIdx + 1)
    }
  }

  return gameDoneList.length ? (
    <PicturesContentBlock>
      <GameDayInfo>
        <ArrowBtn onClick={() => onClickLeft()} backImg={arrowLeft}></ArrowBtn>
        <p>{`${gameDoneList[planIdx].month}월 ${gameDoneList[planIdx].day}일 게임`}</p>
        <ArrowBtn
          onClick={() => onClickRight()}
          backImg={arrowRight}
        ></ArrowBtn>
      </GameDayInfo>
      <GamePlayerInfo>
        <p>MVP: {gameDoneList[planIdx].mvp}</p>
        <p>참여자 : {playerNames.join(', ')}</p>
      </GamePlayerInfo>
      <GameDoneBoard>
        {gameDonePhoto.length === 0 ? (
          <BlankPhotoText>찍은 사진이 없습니다.</BlankPhotoText>
        ) : (
          gameDonePhoto.map((photo, idx) => (
            <GameDoneImg
              key={`photo-${idx}`}
              backImg={photo.photo_Url}
            ></GameDoneImg>
          ))
        )}
      </GameDoneBoard>
    </PicturesContentBlock>
  ) : (
    <PicturesContentBlock>
      <BlankText>모험을 진행하고 일지를 작성하시오.</BlankText>
    </PicturesContentBlock>
  );
};

export default PicturesContent;