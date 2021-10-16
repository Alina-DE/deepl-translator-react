import React from "react";
import Translator from "./components/Translator";

// styling
import "./App.css"


const App = () => {
  return (
    <div className="container-app">
      
      <h2>DeepL Translator</h2>

      <Translator />

    </div>
  );
};

export default App;
