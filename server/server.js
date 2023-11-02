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

/*
const unsplashedAPI = axios.create ({
baseUrl: "https://api.unsplash.com",
headers: {
  Authorization: `Client-ID ${9Tq8U9JelMExfKBsQtbmtF8VaHZ0CodqS6BdGM8aazc}`
}
});
app.get("/api/translate", async (request, response) => {
  const { word } = request.query;

  const translated = await translate(word);
});

const unsplashResponse = await axios.get(
  "https://api.unsplash.com/search/photos",
  {
    params: {
      query: translated,
      per_page: 1,
    },
  }
);

const img = unsplashResponse.data.results[0];

res.json({
  translatedWord: translated,
  image: {
    src: img.urls.regular,
    alt: img.alt_description,
  },
});*/

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
