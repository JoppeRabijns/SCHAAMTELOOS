import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addInstagramData,
  setScrapingFinishedTrue,
} from "../../slices/dataSlice";
import {
  addLinkedinData,
  addSpotifyData,
  addStravaData,
} from "../../slices/dataSlice";
import Nexrender from "../../components/Nexrender/Nexrender";
import "./Loading.scss";
import Pwnd from "../../components/Pwnd/Pwnd";
import Progressbar from "../../components/Progressbar/Progressbar";

const axios = require("axios").default;

function Loading() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.data.facebook.name);
  const scrapingFinished = useSelector((state) => state.data.scrapingFinished);

  useEffect(() => {
    if (!scrapingFinished) {
      getLinkedIn();
      setTimeout(() => {
        getSpotify();
      }, 5000);
      setTimeout(() => {
        getStrava();
      }, 10000);
      setTimeout(() => {
        getInstagram();
      }, 15000);
      dispatch(setScrapingFinishedTrue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLinkedIn() {
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/scraping/linkedin",
      data: {
        name: name,
      },
    }).then(function (response) {
      dispatch(addLinkedinData(response.data));
    });
  }

  function getInstagram() {
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/scraping/instagram",
      data: {
        name: name,
      },
    }).then(function (response) {
      dispatch(addInstagramData(response.data));
    });
  }

  function getSpotify() {
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/scraping/spotify",
      data: {
        name: name,
      },
    }).then(function (response) {
      dispatch(addSpotifyData(response.data));
    });
  }

  function getStrava() {
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/scraping/strava",
      data: {
        name: name,
      },
    }).then(function (response) {
      dispatch(addStravaData(response.data));
    });
  }

  return (
    <div className="loading">
      <Pwnd />
      <Nexrender />
      <Progressbar />
    </div>
  );
}
export default Loading;
