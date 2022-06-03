const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//MIDDLEWARE
app.use(express.static("static"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/linkedin", (req, res) => {
  let name = req.body.name;
  console.log(name);
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/linkedin.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/instagram", (req, res) => {
  let name = req.body.name;
  console.log(name);
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/instagram.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/strava", (req, res) => {
  let name = req.body.name;
  console.log(name);
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/strava.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/spotify", (req, res) => {
  let name = req.body.name;
  console.log(name);
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/spotify.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

const listener = app.listen(443, () => {
  console.log("App is listening on port " + listener.address().port);
});
