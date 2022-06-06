const axios = require("axios");
require("dotenv").config();

const hibp_key = process.env.HIBP_KEY;

const getPwnd = (req, res) => {
  const config = {
    headers: {
      "hibp-api-key": hibp_key,
    },
  };
  let email = req.body.email;
  axios
    .get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false&includeUnverified=false	`,
      config
    )
    .then((response) => res.send(response.data));
};

module.exports = { getPwnd };
