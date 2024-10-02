import React from "react";
import { Iconify } from "@oktaytest/ui";

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
      <Iconify name="mdi:home" size={32} />
    </main>
  );
};

export default App;
