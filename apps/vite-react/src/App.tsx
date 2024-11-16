import "./App.css";

import { Monicon } from "@monicon/react";

function App() {
  return (
    <main>
      <Monicon name="json:network" size={24} />
      <Monicon name="local:folder" size={24} />
      <Monicon name="remote:download" size={24} />
      <Monicon name="remote:attachment" size={24} />
    </main>
  );
}

export default App;
