const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@nexrender/api");
const fs = require("fs");
const path = require("path");

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
    phonenumber: req.body.phonenumber,
  };
  res.sendStatus(200);
  all(res, data).catch(console.error);
  end(res, data).catch(console.error);
});

const all = async (res, data) => {
  let gender;

  let initialDate = data.facebook.birthday.split(/\//);
  let date = [initialDate[1], initialDate[0], initialDate[2]].join("/");

  if (data.facebook.gender === "male") {
    gender = "Man";
  } else if (data.facebook.gender === "female") {
    gender = "Vrouw";
  }
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/NEXRENDER_V1/1080p_Tracking.aep`,
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
        value: `${date}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GESLACHT",
        property: "Source Text",
        value: `${gender}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GSM",
        property: "Source Text",
        value: `${data.phonenumber}`,
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
        value: `Omgeving van ${data.fingerprint.ipLocation.city.name}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedIn.education}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "WERK",
        property: "Source Text",
        value: `${data.linkedIn.experience}`,
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
          module: "@nexrender/action-upload",
          input: "encoded.mp4",
          provider: "ftp",
          params: {
            host: "ftp.rabijnsbe.webhosting.be",
            port: 21,
            user: "joppe@rabijnsbe",
            password: "VdAkfDA5JvcnFX!",
            output: `/media/${data.facebook.id}.mp4`,
          },
        },
      ],
    },
  });
  result.on("created", (job) => console.log("project has been created"));
  result.on("started", (job) => console.log("start"));
  result.on("progress", (job, percents) => console.log(percents));
  result.on("finished", (job) =>
    /* res.sendStatus(200) */ console.log("finsihed")
  );
  /*   concat(data.facebook.id, res)); */
  result.on("error", (err) => console.log("project rendering error", err));
};

const end = async (res, data) => {
  let gender;

  let initialDate = data.facebook.birthday.split(/\//);
  let date = [initialDate[1], initialDate[0], initialDate[2]].join("/");

  if (data.facebook.gender === "male") {
    gender = "Man";
  } else if (data.facebook.gender === "female") {
    gender = "Vrouw";
  }
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/NEXRENDER_V1/1080p_Tracking.aep`,
      composition: `END`,
      outputExt: "mov",
      outputModule: "FINALWORK",
    },
    assets: [
      {
        type: "data",
        layerName: "NAAM",
        property: "Source Text",
        value: `${data.facebook.name}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "WOONPLAATS",
        property: "Source Text",
        value: `${data.fingerprint.ipLocation.city.name}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "DATUM",
        property: "Source Text",
        value: `${date}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GESLACHT",
        property: "Source Text",
        value: `${gender}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GSM",
        property: "Source Text",
        value: `${data.phonenumber}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "EMAIL",
        property: "Source Text",
        value: `${data.facebook.email}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "MOMENTEEL",
        property: "Source Text",
        value: `Omgeving van ${data.fingerprint.ipLocation.city.name}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedIn.education}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "WERK",
        property: "Source Text",
        value: `${data.linkedIn.experience}`,
        composition: "END->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.facebook.picture.data.url}`,
        composition: "END->PANCARTE->FOTO",
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
          module: "@nexrender/action-upload",
          input: "encoded.mp4",
          provider: "ftp",
          params: {
            host: "ftp.rabijnsbe.webhosting.be",
            port: 21,
            user: "joppe@rabijnsbe",
            password: "VdAkfDA5JvcnFX!",
            output: `/media/${data.facebook.id}-2.mp4`,
          },
        },
      ],
    },
  });
  result.on("created", (job) => console.log("project has been created"));
  result.on("started", (job) => console.log("start"));
  result.on("progress", (job, percents) => console.log(percents));
  result.on("finished", (job) => console.log("finsihed"));
  result.on("error", (err) => console.log("project rendering error", err));
};

const listener = app.listen(4000, () => {
  console.log("App is listening on port " + listener.address().port);
});
