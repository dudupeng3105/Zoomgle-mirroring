import styled from 'styled-components';
// import ReactAudioPlayer from 'react-audio-player';
import Animal from "../../media/sounds/animal.wav"
import ReactPlayer from 'react-player';


const reactAudioPlayerBlock = styled.div`
width: 0;
height: 0;
display: none;
`;

const reactAudioPlayer = () => {
  return (
    <reactAudioPlayerBlock>
      {/* <ReactAudioPlayer src={Animal}
    autoPlay
    controls
    // width="400px"
    // height="50px"
    style={{ color: "red"}}>
      </ReactAudioPlayer> */}

<ReactPlayer
        url={Animal}
        width="px"
        height="0px"
        playing={true}
        controls={true}
      />
        



    </reactAudioPlayerBlock>
  );
};

export default reactAudioPlayer;