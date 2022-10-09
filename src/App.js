import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Keeper from "./components/Keeper";

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keeper" element={<Keeper />} />
      </Routes>
    </div>
  );
}

export default App;
