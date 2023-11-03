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

  // make our translation api call
  const translatedAPI = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
  const translatedRes = await axios.get(translatedAPI);

  // make img api call
  const unsplashAPI = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${translatedRes.data.responseData.translatedText}`;
  const unsplashRes = await axios.get(unsplashAPI);
  console.log(unsplashRes.data.results[0].urls.regular);

  // make GIPHY api call
  const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_ACCESS_KEY}&q=${translatedRes.data.responseData.translatedText}`;
  const giphyRes = await axios.get(giphyAPI);
  console.log(giphyRes.data.data[0].images.original.url);

  const wrangledData = {
    translation: translatedRes.data.responseData.translatedText,
    match: translatedRes.data.responseData.match,
    image: unsplashRes.data.results[0].urls.regular,
    giphy: giphyRes.data.data[0].images.original.url,
  };

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
