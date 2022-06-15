/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import "./Player.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlaying1StateTrue,
  setPlaying1StateFalse,
  setPlaying2StateTrue,
  setPlaying2StateFalse,
  setTime,
} from "../../slices/videoSlice";
import { setMenuHide } from "../../slices/menuSlice";
import soundGif from "../../assets/sound.gif";
import soundOff from "../../assets/soundOff.png";
import gsap from "gsap";

const axios = require("axios").default;

function Player({ gender }) {
  const dispatch = useDispatch();
  const playerRef1 = useRef();
  const callStatus = useSelector((state) => state.call.status);
  const Playing1 = useSelector((state) => state.video.playing1);
  const Playing2 = useSelector((state) => state.video.playing2);
  const videoTime = useSelector((state) => state.video.time);
  const facebookID = useSelector((state) => state.data.facebook.id);
  const phoneNumber = useSelector((state) => state.data.phonenumber);

  const [currentVideoPlayer1, setCurrentVideoplayer1] = useState();
  const [currentVideoPlayer2, setCurrentVideoplayer2] = useState();

  const [sound, setSound] = useState(1); //1 = ON ; 0 = OFF
  const [currentNumber, setCurrentNumber] = useState(0);
  const [image, setImage] = useState("");

  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);

  const videos = [
    `https://schaamteloos.online/media/TEKST1_${gender}.mp4`,
    `https://schaamteloos.online/media/${facebookID}.mp4`,
    `https://schaamteloos.online/media/TEKST2.mp4`,
    `https://schaamteloos.online/media/${facebookID}-2.mp4`,
  ];

  useEffect(() => {
    if (currentNumber < videos.length) {
      setCurrentVideoplayer1(videos[currentNumber]);
    }
  }, [currentNumber]);

  function checkProgress(progress, playerId) {
    dispatch(setTime(progress.playedSeconds));
    if (progress.played > 0.75 && playerId === 1) {
      setCurrentVideoplayer2(videos[currentNumber + 1]);
    } else if (progress.played > 0.75 && playerId === 2) {
      setCurrentVideoplayer1(videos[currentNumber + 1]);
    }
  }

  function transition(playerId) {
    if (currentNumber >= 3) {
      setImage(`https://schaamteloos.online/media/${facebookID}.jpg`);
      const tl = gsap.timeline();
      tl.to("#videoplayer", { opacity: 0, duration: 1.5 });
      tl.to("#soundToggle", { opacity: 0, duration: 0.5 });
      tl.to("#einde1", { opacity: 1, duration: 1 });
      tl.to("#einde1", { opacity: 0, duration: 1, delay: 2 });
      tl.to("#einde2", { opacity: 1, duration: 1.5 });
      tl.to("#einde2", { opacity: 0, duration: 1.5, delay: 2 });
      tl.to("#terugnaarhome", { opacity: 1, duration: 1 });
    } else if (playerId === 1) {
      console.log(1);
      dispatch(setPlaying2StateTrue());
      setOpacity1(0);
      setOpacity2(1);
      dispatch(setPlaying1StateFalse());
      setCurrentNumber(currentNumber + 1);
    } else if (playerId === 2) {
      console.log(2);
      dispatch(setPlaying1StateTrue());
      setOpacity1(1);
      setOpacity2(0);
      dispatch(setPlaying2StateFalse());
      setCurrentNumber(currentNumber + 1);
    }
  }

  /**
   * INITIATE CALL
   */
  useEffect(() => {
    if (currentNumber === 2 && videoTime >= 5 && videoTime <= 6) {
      if (callStatus === "not initiated") {
        call();
        setTimeout(() => {
          dispatch(setPlaying1StateFalse());
        }, 4500);
      }
    }
  }, [videoTime, currentNumber]);

  /**
   *  SEEK TO WHEN CALL IS ANSWERED
   */
  useEffect(() => {
    console.log(callStatus);
    if (callStatus === "in-progress") {
      playerRef1.current.seekTo(10.6, "seconds");
      dispatch(setPlaying1StateTrue());
      setSound(0);
    }
  }, [callStatus]);

  /**
   * SOUND ON WHEN CALL IS ENDED
   */
  useEffect(() => {
    if (callStatus === "completed") {
      setSound(1);
    }
  }, [callStatus]);

  /**
   * MAKE CALL
   */
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

  /**
   * HIDE MENU
   */
  useEffect(() => {
    if (currentNumber === 2) {
      dispatch(setMenuHide());
    }
  }, [currentNumber]);

  return (
    <>
      <ReactPlayer
        url={currentVideoPlayer1}
        id="videoplayer"
        playing={Playing1}
        preload="auto"
        volume={sound}
        width="100vw"
        height="100vh"
        className="player1"
        ref={playerRef1}
        style={{ opacity: opacity1 }}
        onEnded={() => transition(1)}
        onProgress={(progress) => {
          Playing1 && checkProgress(progress, 1);
        }}
      />
      <ReactPlayer
        url={currentVideoPlayer2}
        id="videoplayer"
        playing={Playing2}
        preload="auto"
        volume={sound}
        width="100vw"
        height="100vh"
        className="player2"
        style={{ opacity: opacity2 }}
        onEnded={() => transition(2)}
        onProgress={(progress) => {
          Playing2 && checkProgress(progress, 2);
        }}
      />

      <h1 id="einde1" className="einde">
        HET INTERNET VERGEET NIETS,
      </h1>
      <h1 id="einde2" className="einde">
        WEES NIET SCHAAMTELOOS ONLINE!
      </h1>
      <div id="terugnaarhome" className="imageDiv">
        <img src={image} alt="" className="stillImage" />
        <button
          className="terugnaarhome"
          onClick={() => window.location.reload()}
        >
          Terug naar home
        </button>
      </div>

      {sound === 1 ? (
        <img
          src={soundGif}
          alt=""
          className="soundToggle"
          id="soundToggle"
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
          id="soundToggle"
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
