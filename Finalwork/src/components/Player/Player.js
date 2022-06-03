import { useState, useEffect, useRef } from "react";
import "./Player.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  setPlayingStateTrue,
  setPlayingStateFalse,
  setTime,
  setHoldAndContinueButtonFalse,
  setHoldAndContinueButtonTrue,
  setHoldAndContinueButtonActivated,
} from "../../slices/videoSlice";
import { useLongPress } from "use-long-press";
import subtitles from "../../assets/captions/DEMO.vtt";
import soundGif from "../../assets/sound.gif";
import soundOff from "../../assets/soundOff.png";
import tekst2 from "../../assets/video/TEKST_2.mp4";
import manVideo from "../../assets/video/MAN.mp4";
import vrouwVideo from "../../assets/video/VROUW.mp4";
import Lowerthirds from "../Lowerthirds/Lowerthird";

const axios = require("axios").default;

function Player() {
  const playerRef = useRef();
  const dispatch = useDispatch();
  const callStatus = useSelector((state) => state.call.status);
  const videoPlaying = useSelector((state) => state.video.playing);
  const videoTime = useSelector((state) => state.video.time);
  const facebookID = useSelector((state) => state.data.facebook.id);
  const facebookGender = useSelector((state) => state.data.facebook.gender);
  const holdAndContinueButton = useSelector(
    (state) => state.video.holdAndContinueButton
  );
  const holdAndContinueButtonActivated = useSelector(
    (state) => state.video.holdAndContinueButtonActivated
  );

  const [currentVideo, setCurrentVideo] = useState();
  const [sound, setSound] = useState(1); //1 = ON ; 0 = OFF
  const [currentNumber, setCurrentNumber] = useState(0);

  const [firstVideo, setFirstvideo] = useState(manVideo);

  const videos = [
    {
      scene: "0",
      url: firstVideo,
    },
    {
      scene: "1",
      url: `http://84.195.15.105:3000/nexrender/getVideo?facebookID=${facebookID}`,
    },
    {
      scene: "2",
      url: tekst2,
    },
  ];

  useEffect(() => {
    if (facebookGender === "male") {
      setFirstvideo(manVideo);
    } else if (facebookGender === "female") {
      setFirstvideo(vrouwVideo);
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

  /*   useEffect(() => {
    if (videoTime >= 15 && videoTime <= 16 && !holdAndContinueButtonActivated) {
      batch(() => {
        dispatch(setHoldAndContinueButtonTrue());
        dispatch(setPlayingStateFalse());
      });
      longPress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTime]); */

  const longPress = useLongPress(
    () => {
      batch(() => {
        dispatch(setPlayingStateTrue());
        dispatch(setHoldAndContinueButtonFalse());
        dispatch(setHoldAndContinueButtonActivated());
      });
    },
    {
      threshold: 2000,
      captureEvent: true,
      cancelOnMovement: false,
      detect: "mouse",
    }
  );

  function call() {
    axios({
      method: "post",
      url: "http://84.195.15.105:3000/twilio/call",
    }).then(function (response) {
      console.log(response.data);
    });
  }

  return (
    <>
            <Lowerthirds />

      <ReactPlayer
        url={currentVideo}
        playing={videoPlaying}
        preload="auto"
        volume={sound}
        width="100vw"
        height="100vh"
        className="player"
        ref={playerRef}
        /* config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: subtitles,
                srcLang: "nl",
                default: true,
              },
            ],
          },
        }}
        */
        onEnded={() => setCurrentNumber(currentNumber + 1)}
        onProgress={(progress) => {
          videoPlaying && dispatch(setTime(progress.playedSeconds));
        }}
      />
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

      {holdAndContinueButton && !holdAndContinueButtonActivated ? (
        <button {...longPress()} className="longPressButton">
          Hold to continue
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Player;
