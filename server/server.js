const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

app.get("/", (_, response) => response.json("Root route for translatim."));

// add your endpoints here - /translate?word=hello&from=en&to=es

app.get("/translate", async (request, response) => {
  // word to from
  /*const word = request.query.word;
  const from = request.query.from;
  const to = request.query.to;
  or destructure in just one line of code */

  const { word, from, to } = request.query;

  // make api call
  const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  const res = await axios.get(API);

  const wrangledData = {
    translation: res.data.responseData.translatedText,
    match: res.data.responseData.match,
  };

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
