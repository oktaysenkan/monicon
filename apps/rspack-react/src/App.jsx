import React from "react";
import { Monicon } from "@monicon/react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Monicon name="mdi:home" size={32} />
      <Monicon name="invalid:icon" />
    </div>
  );
}

export default App;
