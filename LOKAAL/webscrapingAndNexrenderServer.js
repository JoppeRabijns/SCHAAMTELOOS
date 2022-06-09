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

app.post("/render", (req, res) => {
  res.sendStatus(200);

  let nexrenderData = () => {
    let gender;

    let initialDate = req.body.facebook.birthday.split(/\//);
    let date = [initialDate[1], initialDate[0], initialDate[2]].join("/");

    if (req.body.facebook.gender === "male") {
      gender = "Man";
    } else if (req.body.facebook.gender === "female") {
      gender = "Vrouw";
    }
    return {
      phonenumber: req.body.phonenumber,
      facebook_name: req.body.facebook.name,
      facebook_gender: gender,
      facebook_date: date,
      facebook_hometown: hometown,
      facebook_email: req.body.facebook.email,
      fingerprint_momenteel: req.body.fingerprint.ipLocation.city.name,
      linkedin_education: req.body.linkedIn.education,
      linkedin_experience: req.body.linkedIn.experience,
      facebook_foto: req.body.facebook.picture.data.url,
      instagram_followers: req.body.instagram.followers_count,
      instagram_images: req.body.instagram.images,
      strava_image: req.body.strava.latest_image,
      strava_club: req.body.strava.club,
      strava_follower: req.body.strava.follower,
      spotify_follower: req.body.spotify.follower,
      spotify_playlist: req.body.spotify.playlist,
    };
  };

  console.log(nexrenderData);

  all(res, nexrenderData).catch(console.error);
  end(res, nexrenderData).catch(console.error);
});

const all = async (res, data) => {
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
        value: `${data.facebook_name}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "DATUM",
        property: "Source Text",
        value: `${facebook_date}`,
        composition: `ALL->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GESLACHT",
        property: "Source Text",
        value: `${data.facebook_gender}`,
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
        value: `${data.facebook_email}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "MOMENTEEL",
        property: "Source Text",
        value: `Omgeving van ${data.fingerprint_momenteel}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedin_education}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "WERK",
        property: "Source Text",
        value: `${data.linkedin_experience}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.facebook_foto}`,
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
        value: `${data.facebook_name}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "DATUM",
        property: "Source Text",
        value: `${facebook_date}`,
        composition: `END->PANCARTE`,
      },
      {
        type: "data",
        layerName: "GESLACHT",
        property: "Source Text",
        value: `${data.facebook_gender}`,
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
        value: `${data.facebook_email}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "MOMENTEEL",
        property: "Source Text",
        value: `Omgeving van ${data.fingerprint_momenteel}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedin_education}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "WERK",
        property: "Source Text",
        value: `${data.linkedin_experience}`,
        composition: "END->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.facebook_foto}`,
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
