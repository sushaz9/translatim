import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // store our from and to languages in state
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");

  // store the word we want to translate in state
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [image, setImage] = useState("");

  // onchange function for input of the word we want to translate

  // on submit function that gets translation
  async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    setTranslation(res.data.translation);
    setImage(res.data.image);
  }

  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="container">
          <select onChange={(event) => setFrom(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          <input
            placeholder="Translate"
            onChange={(event) => setWord(event.target.value)}
          />
        </div>

        <div className="container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
          </select>
          <button>Submit</button>
          <div className="output">{translation}</div>
        </div>
        <img src={image} />
      </form>

      {/* show our translation  */}
      {/* STRETCH - show a gif from GIPHY API that matches translation */}
    </>
  );
}

export default App;
