import React, { useRef, useEffect } from 'react';

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();
  // componentDidMount() == 
  //  useEffect(() => { 여기에 코드를 적자  }, [])  
  useEffect(() => {    
    if (streamManager && !videoRef) {      
      streamManager.addVideoElement(videoRef.current);
    }
  }, [])

  // componentDidUpdate() == useEffect(() => { 여기에 코드를 적자 }, [props명, state명, ...])
  useEffect(() => {
    if (streamManager && !!videoRef) {      
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager])

  return (
    <>
      <video autoPlay={true} ref={videoRef} /> 
    </>
  );
};

export default OpenViduVideoComponent;
