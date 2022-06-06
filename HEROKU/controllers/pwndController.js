const axios = require("axios");

const getPwnd = (req, res) => {
  const config = {
    headers: {
      "hibp-api-key": "5e3d5c7451294fb1ae107a6c18f2a8b4",
    },
  };
  let email = req.body.email;
  axios
    .get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false&includeUnverified=false`,
      config
    )
    .then((response) => res.send(response.data))
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports = { getPwnd };
