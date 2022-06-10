const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@nexrender/api");

require("dotenv").config();

const client = createClient({
  host: "http://84.195.15.105:3000",
  secret: "schaamteloos.online",
});

//MIDDLEWARE
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

  let gender;

  let initialDate = req.body.facebook.birthday.split(/\//);
  let date = [initialDate[1], initialDate[0], initialDate[2]].join("/");

  if (req.body.facebook.gender === "male") {
    gender = "Man";
  } else if (req.body.facebook.gender === "female") {
    gender = "Vrouw";
  } else {
    gender = "Man";
  }

  function numberOfImages() {
    let nummerOfImages = 1;
    let images = [];
    images.push(req.body.facebook.picture.data.url);
    if (typeof req.body.instagram.images !== "undefined") {
      for (let i = 0; i < 2; i++) {
        if (typeof req.body.instagram.images[i] !== "undefined") {
          nummerOfImages++;
          images.push(req.body.instagram.images[i]);
        }
      }
    }
    if (typeof req.body.strava.latest_image !== "undefined") {
      nummerOfImages++;
      images.push(req.body.strava.latest_image);
    }
    for (let i = nummerOfImages; i < 5; i++) {
      images.push(
        "https://www.romacfuels.com/wp-content/uploads/2020/12/orionthemes-placeholder-image-1-1.png"
      );
    }
    return images;
  }

  function checkUndefined(variable) {
    if (typeof variable == "undefined") {
      let nothing = "Niet gevonden";
      return nothing;
    } else {
      return variable;
    }
  }

  /*   .split(",")[0] */

  let nexrenderData = {
    images: numberOfImages(),
    phonenumber: req.body.phonenumber,
    fingerprint_ip: checkUndefined(req.body.fingerprint.ip),
    facebook_id: req.body.facebook.id,
    facebook_name: req.body.facebook.name,
    facebook_gender: gender,
    facebook_date: date,
    facebook_hometown: "Niet gevonden",
    facebook_email: checkUndefined(req.body.facebook.email),
    fingerprint_momenteel: checkUndefined(
      req.body.fingerprint.ipLocation.city.name
    ),
    linkedin_education: checkUndefined(req.body.linkedIn.education),
    linkedin_experience: checkUndefined(req.body.linkedIn.experience),
    facebook_foto: req.body.facebook.picture.data.url,
    instagram_followers_count: checkUndefined(
      req.body.instagram.followers_count
    ),
    strava_club: checkUndefined(req.body.strava.club),
    strava_latest: checkUndefined(req.body.strava.latest_activity),
    strava_follower: checkUndefined(req.body.strava.follower),
    spotify_follower: checkUndefined(req.body.spotify.follower),
    spotify_playlist: checkUndefined(req.body.spotify.playlist),
  };

  console.log(nexrenderData);

  all(nexrenderData).catch(console.error);
  /*   end(nexrenderData).catch(console.error);
  still(nexrenderData).catch(console.error); */
});

const all = async (data) => {
  let compNumber = data.images.length + 1;
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/V2/1080p_Tracking.aep`,
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
        value: `${data.facebook_date}`,
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
        layerName: "STAD",
        property: "Source Text",
        value: `${data.facebook_hometown}`,
        composition: `ALL->PANCARTE`,
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
        layerName: "TELEFOON",
        property: "Source Text",
        value: `${data.phonenumber}`,
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
        layerName: "IP",
        property: "Source Text",
        value: `ip: ${data.fingerprint_ip}`,
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
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedin_education}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "INSTAGRAM_VOLGERS",
        property: "Source Text",
        value: `${data.instagram_followers_count}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_AFSPEELLIJST",
        property: "Source Text",
        value: `afspeellijst: ${data.spotify_playlist}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.spotify_follower}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_ACTIVITEIT",
        property: "Source Text",
        value: `Laatste activiteit: ${data.strava_latest}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_CLUB",
        property: "Source Text",
        value: `Club: ${data.strava_club}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.strava_follower}`,
        composition: "ALL->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[0]}`,
        composition: `ALL->PANCARTE->${compNumber}_FOTOS`,
      },
      {
        type: "image",
        layerName: "FOTO_2",
        src: `${data.images[1]}`,
        composition: `ALL->PANCARTE->${compNumber}_FOTOS`,
      },
      {
        type: "image",
        layerName: "FOTO_3",
        src: `${data.images[2]}`,
        composition: `ALL->PANCARTE->${compNumber}_FOTOS`,
      },
      {
        type: "image",
        layerName: "FOTO_4",
        src: `${data.images[3]}`,
        composition: `ALL->PANCARTE->${compNumber}_FOTOS`,
      },
      {
        type: "image",
        layerName: "FOTO_5",
        src: `${data.images[4]}`,
        composition: `ALL->PANCARTE->${compNumber}_FOTOS`,
      },
      {
        type: "data",
        layerName: `${compNumber}_FOTOS`,
        property: "Opacity",
        composition: `ALL->PANCARTE`,
        value: 100,
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
            output: `/media/${data.facebook_id}.mp4`,
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

const end = async (data) => {
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/V2/1080p_Tracking.aep`,
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
        value: `${data.facebook_date}`,
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
        layerName: "STAD",
        property: "Source Text",
        value: `${data.facebook_hometown}`,
        composition: `END->PANCARTE`,
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
        layerName: "TELEFOON",
        property: "Source Text",
        value: `${data.phonenumber}`,
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
        layerName: "IP",
        property: "Source Text",
        value: `ip: ${data.fingerprint_ip}`,
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
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedin_education}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "INSTAGRAM_VOLGERS",
        property: "Source Text",
        value: `${data.instagram_followers_count}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_AFSPEELLIJST",
        property: "Source Text",
        value: `afspeellijst: ${data.spotify_playlist}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.spotify_follower}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_ACTIVITEIT",
        property: "Source Text",
        value: `Laatste activiteit: ${data.strava_latest}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_CLUB",
        property: "Source Text",
        value: `Club: ${data.strava_club}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.strava_follower}`,
        composition: "END->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[0]}`,
        composition: "END->PANCARTE->FOTO",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[1]}`,
        composition: "END->PANCARTE->FOTO_2",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[2]}`,
        composition: "END->PANCARTE->FOTO_3",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[3]}`,
        composition: "END->PANCARTE->FOTO_4",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[4]}`,
        composition: "END->PANCARTE->FOTO_5",
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
            output: `/media/${data.facebook_id}-2.mp4`,
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

const still = async (data) => {
  const result = await client.addJob({
    template: {
      src: `file:///Users/joppe.rabijns/Desktop/V2/1080p_Tracking.aep`,
      composition: `END`,
      frameStart: "264",
      frameEnd: "264",
      outputExt: "jpeg",
      outputModule: "FINALWORK_JPG",
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
        value: `${data.facebook_date}`,
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
        layerName: "STAD",
        property: "Source Text",
        value: `${data.facebook_hometown}`,
        composition: `END->PANCARTE`,
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
        layerName: "TELEFOON",
        property: "Source Text",
        value: `${data.phonenumber}`,
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
        layerName: "IP",
        property: "Source Text",
        value: `ip: ${data.fingerprint_ip}`,
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
        type: "data",
        layerName: "STUDIE",
        property: "Source Text",
        value: `${data.linkedin_education}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "INSTAGRAM_VOLGERS",
        property: "Source Text",
        value: `${data.instagram_followers_count}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_AFSPEELLIJST",
        property: "Source Text",
        value: `afspeellijst: ${data.spotify_playlist}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "SPOTIFY_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.spotify_follower}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_ACTIVITEIT",
        property: "Source Text",
        value: `Laatste activiteit: ${data.strava_latest}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_CLUB",
        property: "Source Text",
        value: `Club: ${data.strava_club}`,
        composition: "END->PANCARTE",
      },
      {
        type: "data",
        layerName: "STRAVA_VOLGT",
        property: "Source Text",
        value: `Volgt o.a.: ${data.strava_follower}`,
        composition: "END->PANCARTE",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[0]}`,
        composition: "END->PANCARTE->FOTO",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[1]}`,
        composition: "END->PANCARTE->FOTO_2",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[2]}`,
        composition: "END->PANCARTE->FOTO_3",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[3]}`,
        composition: "END->PANCARTE->FOTO_4",
      },
      {
        type: "image",
        layerName: "FOTO",
        src: `${data.images[4]}`,
        composition: "END->PANCARTE->FOTO_5",
      },
    ],
    actions: {
      postrender: [
        {
          module: "@nexrender/action-upload",
          input: "result_00264.jpg",
          provider: "ftp",
          params: {
            host: "ftp.rabijnsbe.webhosting.be",
            port: 21,
            user: "joppe@rabijnsbe",
            password: "VdAkfDA5JvcnFX!",
            output: `/media/${data.facebook_id}.jpg`,
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
