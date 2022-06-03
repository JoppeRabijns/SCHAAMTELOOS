const express = require("express");
const router = express.Router();
const callController = require("../controllers/callController");
const scrapingController = require("../controllers/scrapingController");
const nexrenderController = require("../controllers/nexrenderController");
const pwndController = require("../controllers/pwndController");

//SCRAPING
router.post("/scraping/linkedin", scrapingController.getLinkedin);
router.post("/scraping/strava", scrapingController.getStrava);
router.post("/scraping/spotify", scrapingController.getSpotify);
router.post("/scraping/instagram", scrapingController.getInstagram);

//TWILLIO
router.post("/twilio/events", callController.getEventStatus);
router.post("/twilio/call", callController.call);

//NEXRENDER
router.post("/nexrender/render", nexrenderController.render);
router.get("/nexrender/getVideo", nexrenderController.getVideo);

//PWND
router.post("/pwnd", pwndController.getPwnd);

module.exports = router;
