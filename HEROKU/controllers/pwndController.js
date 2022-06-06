const axios = require("axios");

const getPwnd = (req, res) => {
  const config = {
    headers: {
      "hibp-api-key": "5e3d5c7451294fb1ae107a6c18f2a8b4",
    },
  };
  let email = req.body.email;

  (async () => {
    let apiRes = null;
    try {
      apiRes = await axios.get(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false&includeUnverified=false`,
        config
      );
    } catch (err) {
      res.sendStatus(err);
    } finally {
      res.send(apiRes.data);
    }
  })();
};

module.exports = { getPwnd };
