import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'
import { useDispatch, useSelector} from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";
import { useEffect, useState } from "react";

const PicturesContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

const GameDayInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 80vw;
  font-size: 4vmin;
  color: #412E22;
`
const GameDoneBoard = styled.div`
  width: 80vw;
  height: 70vh;
  margin-left: 1vw;
  background-color: transparent;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const GameDoneImg = styled.div`
  width: 25vw;  
  height: 33vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 25vw 33vh; 
  border: 1px solid black;
  border-radius: 5px;  
`

const GamePlayerInfo = styled.div`
  width: 80vw;
  height: 10vh;
  display: flex;
  margin-left: 1vw;
  align-items: center;
  background-color: transparent;
  /* border: 1px solid blue;   */
  justify-content: space-between;    
  font-size: 5vmin;
  color: #412E22;
`

const ArrowBtn = styled.div`
  width: 30vw;
  height: 10vh;
  cursor: pointer;  
  border: 1px solid black;
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

  return (
    gameDoneList.length ? (<PicturesContentBlock>
      <GameDayInfo>
        <ArrowBtn onClick={() => onClickLeft()}>이전</ArrowBtn>
        {`${gameDoneList[planIdx].month}월 ${gameDoneList[planIdx].day}일 게임`}
        <ArrowBtn onClick={() => onClickRight()}>다음</ArrowBtn>
      </GameDayInfo>
      <GamePlayerInfo>
        <p>MVP: {gameDoneList[planIdx].mvp}</p>
        <p>참여자 : {playerNames.join(', ')}</p>
      </GamePlayerInfo>
      <GameDoneBoard>
        {gameDonePhoto.map((photo, idx) => (
          <GameDoneImg key={`photo-${idx}`} backImg={photo.photo_Url}></GameDoneImg>
        ))}
      </GameDoneBoard>
    </PicturesContentBlock>) : ''
  );
};

export default PicturesContent;