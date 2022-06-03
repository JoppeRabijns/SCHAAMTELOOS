const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./routes/routes");

const listener = app.listen(1000, () => {
  console.log("App is listening on port " + listener.address().port);
});

//MIDDLEWARE
app.use(express.static("static"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(bodyParser.json());

//ROUTES
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Dit werkt");
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

global.client = require("twilio")(accountSid, authToken);
global.io = require("socket.io")(listener);

io.on("connection", function (client) {});
