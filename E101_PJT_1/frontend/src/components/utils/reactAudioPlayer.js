import styled from 'styled-components';
// import ReactAudioPlayer from 'react-audio-player';
import Animal from '../../media/sounds/animal.wav';
import ReactPlayer from 'react-player';

const ReactAudioPlayerBlock = styled.div`
  width: 0;
  height: 0;
  display: none;
`;

const ReactAudioPlayer = ({urlSound, isLoop, isPlaying}) => {  
  return (
    <ReactAudioPlayerBlock>
      <ReactPlayer
        url={urlSound}
        width="px"
        height="0px"
        playing={isPlaying} // 자동 재생 on
        controls={false}
        loop={isLoop}
        // muted={true} // 자동 재생 on        
      />
    </ReactAudioPlayerBlock>
  );
};

export default ReactAudioPlayer;
