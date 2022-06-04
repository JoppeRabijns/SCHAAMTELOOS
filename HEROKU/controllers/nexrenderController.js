require("dotenv").config();
const axios = require("axios");

const render = (req, res) => {
  let socketId = req.body.id;
  let facebook = req.body.facebook;
  let fingerprint = req.body.fingerprint;
  let linkedIn = req.body.linkedIn;
  let instagram = req.body.instagram;
  let strava = req.body.strava;
  let spotify = req.body.spotify;

  axios
    .post(`http://84.195.15.105:4000/render`, {
      socketId: socketId,
      facebook: facebook,
      fingerprint: fingerprint,
      linkedIn: linkedIn,
      instagram: instagram,
      strava: strava,
      spotify: spotify,
    })
    .then((response) => res.send(response.data));
};

module.exports = { render };
