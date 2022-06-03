import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { useDispatch } from "react-redux";
import { addFingerprintData } from "../../slices/dataSlice";
import "./Fingerprint.scss";
const BROWSER_API_KEY = "hhw5HKFXfMgxBOyiY8av";
const SERVER_API_KEY = "eTJEo5opd2vkqhHS8OQc";

/* const BROWSER_API_KEY = process.env.REACT_APP_BROWSER_API_KEY;
const SERVER_API_KEY = process.env.REACT_APP_SERVER_API_KEY; */

function Fingerprint() {
  const dispatch = useDispatch();
  const [ip, setIp] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatidude] = useState();

  useEffect(() => {
    FingerprintJS.load({
      token: BROWSER_API_KEY,
    })
      .then((fp) => fp.get())
      .then((result) => {
        handleGetVisitsHistory(result.visitorId);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getVisits(visitorId) {
    return fetch(
      `https://api.fpjs.io/visitors/${visitorId}?limit=1&token=${SERVER_API_KEY}`
    ).then((response) => {
      return response.json();
    });
  }

  async function handleGetVisitsHistory(visitorId) {
    const history = await getVisits(visitorId);
    dispatch(addFingerprintData(history.visits[0]));
    setIp(addFingerprintData(history.visits[0]).payload.ip);
    setLongitude(
      addFingerprintData(history.visits[0]).payload.ipLocation.longitude
    );
    setLatidude(
      addFingerprintData(history.visits[0]).payload.ipLocation.latitude
    );
  }

  //https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format

  function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "° " + minutes + "' " + seconds + '""';
  }

  function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "Z";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "O" : "W";

    return (
      latitude +
      " " +
      latitudeCardinal +
      "\n" +
      longitude +
      " " +
      longitudeCardinal
    );
  }

  return (
    <div className="fingerprintSideData">
      <h6 className="ip">IP: {ip} </h6>
      <h6 className="LatLong">{convertDMS(latitude, longitude)}</h6>
    </div>
  );
}

export default Fingerprint;
