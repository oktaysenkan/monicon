import "./App.css";

import { Monicon } from "@monicon/react";

function App() {
  return (
    <main>
      <Monicon name="remote:test" size={24} />
      <Monicon name="mock:test" size={24} />
      <Monicon name="local:test" size={24} />
    </main>
  );
}

export default App;
