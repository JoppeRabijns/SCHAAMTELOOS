require("dotenv").config();
const axios = require("axios");

const render = (req, res) => {
  let facebook = req.body.facebook;
  let fingerprint = req.body.fingerprint;
  let linkedIn = req.body.linkedIn;
  let instagram = req.body.instagram;
  let strava = req.body.strava;
  let spotify = req.body.spotify;

  axios
    .post(`http://84.195.15.105:4000/render`, {
      facebook,
      fingerprint,
      linkedIn,
      strava,
      spotify,
      instagram,
    })
    .then((response) => res.send(response));
};

module.exports = { render };
