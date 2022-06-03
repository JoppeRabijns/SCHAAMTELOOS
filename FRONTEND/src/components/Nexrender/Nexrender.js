import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRenderStart } from "../../slices/videoSlice";

const axios = require("axios").default;

function Nexrender() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const renderStart = useSelector((state) => state.video.renderStart);
  const linkedIn = useSelector((state) => state.data.linkedIn);
  const strava = useSelector((state) => state.data.strava);
  const spotify = useSelector((state) => state.data.spotify);
  const instagram = useSelector((state) => state.data.instagram);
  const socketId = useSelector((state) => state.socket.id);
  const facebook = useSelector((state) => state.data.facebook);
  const fingerprint = useSelector((state) => state.data.fingerprint);

  useEffect(() => {
    if (!renderStart && linkedIn && strava && spotify && instagram) {
      axios({
        method: "post",
        url: "http://84.195.15.105:3000/nexrender/render",
        data: {
          id: socketId,
          facebook: facebook,
          fingerprint: fingerprint,
          instagram: instagram,
          strava: strava,
          spotify: spotify,
        },
      })
        .then(dispatch(setRenderStart()))
        .then(function (response) {
          console.log(response);
          navigate("/video");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderStart, linkedIn, strava, spotify, instagram]);

  return null;
}

export default Nexrender;
