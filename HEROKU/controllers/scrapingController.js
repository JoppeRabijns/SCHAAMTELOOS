require("dotenv").config();
const axios = require("axios");

const getLinkedin = (req, res) => {
  let name = req.body.name;
  axios
    .post(`http://84.195.15.105:4000/linkedin`, {
      name: name,
    })
    .then((response) => res.send(response.data));
};

const getInstagram = (req, res) => {
  let name = req.body.name;
  axios
    .post(`http://84.195.15.105:4000/instagram`, {
      name: name,
    })
    .then((response) => res.send(response.data));
};

const getStrava = (req, res) => {
  let name = req.body.name;
  axios
    .post(`http://84.195.15.105:4000/strava`, {
      name: name,
    })
    .then((response) => res.send(response.data));
};

const getSpotify = (req, res) => {
  let name = req.body.name;
  axios
    .post(`http://84.195.15.105:4000/spotify`, {
      name: name,
    })
    .then((response) => res.send(response.data));
};

module.exports = {
  getLinkedin,
  getStrava,
  getSpotify,
  getInstagram,
};
