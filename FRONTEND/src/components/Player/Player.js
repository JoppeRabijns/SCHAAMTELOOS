import { useState, useEffect, useRef } from "react";
import "./Player.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayingStateTrue,
  setPlayingStateFalse,
  setTime,
} from "../../slices/videoSlice";
import soundGif from "../../assets/sound.gif";
import soundOff from "../../assets/soundOff.png";
import Lowerthirds from "../Lowerthirds/Lowerthird";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const axios = require("axios").default;

function Player() {
  const playerRef = useRef();
  const dispatch = useDispatch();
  const callStatus = useSelector((state) => state.call.status);
  const videoPlaying = useSelector((state) => state.video.playing);
  const videoTime = useSelector((state) => state.video.time);
  const facebookID = useSelector((state) => state.data.facebook.id);
  const facebookGender = useSelector((state) => state.data.facebook.gender);
  const phoneNumber = useSelector((state) => state.data.phonenumber);

  const [currentVideo, setCurrentVideo] = useState();
  const [sound, setSound] = useState(1); //1 = ON ; 0 = OFF
  const [currentNumber, setCurrentNumber] = useState(0);

  const [firstVideo, setFirstvideo] = useState(
    `https://schaamteloos.online/media/TEKST1_MAN.mp4`
  );

  const videos = [
    {
      scene: "0",
      url: firstVideo,
    },
    {
      scene: "1",
      url: `https://schaamteloos.online/media/${facebookID}.mp4`,
    },
    {
      scene: "2",
      url: `https://schaamteloos.online/media/TEKST2.mp4`,
    },
    {
      scene: "3",
      url: `https://schaamteloos.online/media/${facebookID}-2.mp4`,
    },
  ];

  useEffect(() => {
    if (facebookGender === "male") {
      setFirstvideo(`https://schaamteloos.online/media/TEKST1_MAN.mp4`);
    } else if (facebookGender === "female") {
      setFirstvideo(`https://schaamteloos.online/media/TEKST1_VROUW.mp4`);
    }
    console.log(videos);
  }, []);

  useEffect(() => {
    if (currentNumber < videos.length) {
      setCurrentVideo(videos[currentNumber].url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  useEffect(() => {
    if (currentNumber === 2 && videoTime >= 5 && videoTime <= 6) {
      if (callStatus === "not initiated") {
        call();
        setTimeout(() => {
          dispatch(setPlayingStateFalse());
        }, 4500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTime, currentNumber]);

  useEffect(() => {
    console.log(callStatus);
    if (callStatus === "in-progress") {
      playerRef.current.seekTo(10, "seconds");
      dispatch(setPlayingStateTrue());
      setSound(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus]);

  useEffect(() => {
    if (callStatus === "completed") {
      setSound(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus]);

  function call() {
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/twilio/call",
      data: {
        phoneNumber: phoneNumber,
      },
    }).then(function (response) {
      console.log(response.data);
    });
  }

  return (
    <>
      <Lowerthirds />
      {/* <TransitionGroup>
        <CSSTransition key={currentNumber} timeout={300} classNames="videoout"> */}
      <ReactPlayer
        url={currentVideo}
        playing={videoPlaying}
        preload="auto"
        volume={sound}
        width="100vw"
        height="100vh"
        className="player"
        ref={playerRef}
        onEnded={() => setCurrentNumber(currentNumber + 1)}
        onProgress={(progress) => {
          videoPlaying && dispatch(setTime(progress.playedSeconds));
        }}
      />
      {/*  </CSSTransition>
      </TransitionGroup>
 */}
      {sound === 1 ? (
        <img
          src={soundGif}
          alt=""
          className="soundToggle"
          onClick={() => {
            if (sound === 1) {
              setSound(0);
            } else {
              setSound(1);
            }
          }}
        />
      ) : (
        <img
          src={soundOff}
          alt=""
          className="soundToggle"
          onClick={() => {
            if (sound === 1) {
              setSound(0);
            } else {
              setSound(1);
            }
          }}
        />
      )}
    </>
  );
}

export default Player;
