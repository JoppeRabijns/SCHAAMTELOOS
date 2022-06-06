require("dotenv").config();
const axios = require("axios");

const render = (req, res) => {
  let facebook = req.body.facebook;
  let fingerprint = req.body.fingerprint;
  let linkedIn = req.body.linkedIn;
  let instagram = req.body.instagram;
  let strava = req.body.strava;
  let spotify = req.body.spotify;
  let phonenumber = req.body.phonenumber;

  axios
    .post(`http://84.195.15.105:4000/render`, {
      facebook: facebook,
      fingerprint: fingerprint,
      linkedIn: linkedIn,
      strava: strava,
      spotify: spotify,
      instagram: instagram,
      phonenumber: phonenumber,
    })
    .then((response) => res.send(response.data));
};

module.exports = { render };
