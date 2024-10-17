import React from "react";
import { Monicon } from "@monicon/react";

const App = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Monicon name="mdi:home" size={32} />
    </main>
  );
};

export default App;
