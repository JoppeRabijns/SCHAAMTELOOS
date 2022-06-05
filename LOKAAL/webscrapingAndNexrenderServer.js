const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@nexrender/api");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

require("dotenv").config();

const client = createClient({
  host: "http://84.195.15.105:3000",
  secret: "schaamteloos.online",
});

//MIDDLEWARE
app.use(express.static("static"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/linkedin", (req, res) => {
  let name = req.body.name;
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/linkedin.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/instagram", (req, res) => {
  let name = req.body.name;
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/instagram.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/strava", (req, res) => {
  let name = req.body.name;
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/strava.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

app.post("/spotify", (req, res) => {
  let name = req.body.name;
  let spawn = require("child_process").spawn;
  let process = spawn("python3", ["./pythonScripts/spotify.py", name]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });
});

//https://stackoverflow.com/questions/66257999/res-many-videos-nodejs
app.get("/getVideo", (req, res) => {
  const path = `/Users/joppe.rabijns/Desktop/Finalwork_Nexrender_Outputs/${req.query.facebookID}.mp4`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.post("/render", (req, res) => {
  let data = {
    facebook: req.body.facebook,
    fingerprint: req.body.fingerprint,
    linkedIn: req.body.linkedIn,
    instagram: req.body.instagram,
    strava: req.body.strava,
    spotify: req.body.spotify,
  };
  res.sendStatus(200);
  main(res, data).catch(console.error);
});

 main = async (res, data) => {
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/V1/1080p_Tracking.aep`,
      composition: `ALL`,
      outputExt: "mov",
      outputModule: "FINALWORK",
    },
    assets: [
      {
        type: "data",
        layerName: "NAAM",
        property: "Source Text",
        value: `${data.facebook.name}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "WOONPLAATS",
        property: "Source Text",
        value: `${data.fingerprint.ipLocation.city.name}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "DATUM",
        property: "Source Text",
        value: `${data.facebook.birthday}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GSM",
        property: "Source Text",
        value: `${data.fingerprint.ip}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "EMAIL",
        property: "Source Text",
        value: `${data.facebook.email}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "MOMENTEEL",
        property: "Source Text",
        value: `${data.fingerprint.ipLocation.city.name}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.facebook.picture.data.url}`,
        composition: "ALL->PANCARTE->FOTO",
      },
    ],
    actions: {
      postrender: [
        {
          module: "@nexrender/action-encode",
          preset: "mp4",
          output: "encoded.mp4",
        },
        {
          "module": "@nexrender/action-upload",
          input: "encoded.mp4",
          "provider": "ftp",
          "params": {
              "host": "ftp.rabijnsbe.webhosting.be",
              "port": 21,
              "user": "joppe@rabijnsbe",
              "password": "VdAkfDA5JvcnFX!",
              "output": `/media/${data.facebook.id}.mp4`
          }
      }
      ],
    },
  });
  result.on("created", (job) => console.log("project has been created"));
  result.on("started", (job) => console.log("start"));
  result.on("progress", (job, percents) => console.log(percents));
  result.on("finished", (job) => /* res.sendStatus(200) */ console.log("finsihed"));
  /*   concat(data.facebook.id, res)); */
  result.on("error", (err) => console.log("project rendering error", err));
};

/* function concat(facebookId, res) {
  ffmpeg("/Users/joppe.rabijns/Desktop/Finalwork_Nexrender_Outputs/MAN.mp4")
    .input(
      `/Users/joppe.rabijns/Desktop/Finalwork_Nexrender_Outputs/${facebookId}.mp4`
    )
    .input(`/Users/joppe.rabijns/Desktop/Finalwork_Nexrender_Outputs/TEKST_2.mp4`)
    .on('progress', function(progress) {
      console.log('Processing: ' + progress.percent + '% done');
    })
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
    })
    .on("end", function () {
      console.log("Merging finished !");
      res.sendStatus(200);
    })
    .mergeToFile(
      `/Users/joppe.rabijns/Desktop/Finalwork_Nexrender_Outputs/${facebookId}-1.mp4`
    );
} */

const listener = app.listen(4000, () => {
  console.log("App is listening on port " + listener.address().port);
});