require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const getEventStatus = (req, res) => {
  let to = req.body.To;
  let fromNumber = req.body.From;
  let callStatus = req.body.CallStatus;
  let callSid = req.body.CallSid;
  console.log(to, callStatus);
  io.emit("call progress event", { to, fromNumber, callStatus, callSid });
  res.send("Event received");
};

const call = (req, res) => {
  client.calls.create(
    {
      twiml:
        "<Response><Play>https://joppe.rabijns.be/TEKST_2.mp3</Play><Hangup/></Response>",
      to: "+32478027029",
      from: "+32460258118",
      statusCallback: "http://adequaat.ddns.net:3000/twilio/events", //HEROKU LINK
      statusCallbackMethod: "POST",
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    },
    (err, call) => {
      if (err) {
        console.log(err);
        return err;
      }
      process.stdout.write(call.sid);
    }
  );
  res.sendStatus(200);
};

module.exports = { getEventStatus, call };
