import { useState, useEffect, useRef } from "react";
import "./Player.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayingStateTrue,
  setPlayingStateFalse,
  setTime,
} from "../../slices/videoSlice";
import { setMenuHide } from "../../slices/menuSlice";
import soundGif from "../../assets/sound.gif";
import soundOff from "../../assets/soundOff.png";
import gsap from "gsap";

const axios = require("axios").default;

function Player({ gender }) {
  const playerRef = useRef();
  const dispatch = useDispatch();
  const callStatus = useSelector((state) => state.call.status);
  const videoPlaying = useSelector((state) => state.video.playing);
  const videoTime = useSelector((state) => state.video.time);
  const facebookID = useSelector((state) => state.data.facebook.id);
  const phoneNumber = useSelector((state) => state.data.phonenumber);

  const [currentVideo, setCurrentVideo] = useState();
  const [sound, setSound] = useState(1); //1 = ON ; 0 = OFF
  const [currentNumber, setCurrentNumber] = useState(0);

  const videos = [
    `https://schaamteloos.online/media/TEKST1_${gender}.mp4`,
    `https://schaamteloos.online/media/${facebookID}.mp4`,
    `https://schaamteloos.online/media/TEKST2.mp4`,
    `https://schaamteloos.online/media/${facebookID}-2.mp4`,
  ];

  useEffect(() => {
    if (currentNumber < videos.length) {
      setCurrentVideo(videos[currentNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  useEffect(() => {
    if (currentNumber === 1) {
      console.log(currentNumber);
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          dispatch(setPlayingStateFalse());
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.code === "Space") {
          dispatch(setPlayingStateTrue());
        }
      });
    }
  });

  useEffect(() => {
    if (currentNumber === 3) {
      console.log(currentNumber);
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          dispatch(setPlayingStateFalse());
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.code === "Space") {
          dispatch(setPlayingStateTrue());
        }
      });
    }
  });

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

  useEffect(() => {
    if (currentNumber === 2) {
      dispatch(setMenuHide());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  function ended() {
    if (currentNumber === 3) {
      const tl = gsap.timeline();
      tl.to("#videoplayer", { opacity: 0, duration: 1.5 });
      tl.to("#einde1", { opacity: 1, duration: 1 });
      tl.to("#einde1", { opacity: 0, duration: 1, delay: 2 });
      tl.to("#einde2", { opacity: 1, duration: 1.5 });
      tl.to("#einde2", { opacity: 0, duration: 1.5, delay: 2 });
      tl.to("#terugnaarhome", { opacity: 1, duration: 1 });
    } else {
      setCurrentNumber(currentNumber + 1);
    }
  }

  return (
    <>
      <ReactPlayer
        url={currentVideo}
        id="videoplayer"
        playing={videoPlaying}
        preload="auto"
        volume={sound}
        width="100vw"
        height="100vh"
        className={"player"}
        ref={playerRef}
        onEnded={() => ended()}
        onProgress={(progress) => {
          videoPlaying && dispatch(setTime(progress.playedSeconds));
        }}
      />
      <h1 id="einde1" className="einde">
        HET INTERNET VERGEET NIKS,
      </h1>
      <h1 id="einde2" className="einde">
        WEES NIET SCHAAMTELOOS ONLINE!
      </h1>
      <div id="terugnaarhome">
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
