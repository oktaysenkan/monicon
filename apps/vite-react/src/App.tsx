import "./App.css";

import { Monicon } from "@monicon/react";

function App() {
  return (
    <main>
      <Monicon name="mdi:home" />
      <Monicon name="logos:active-campaign" />
      <Monicon name="logos:apache-superset-icon" />
      <Monicon name="invalid:icon" />
      <Monicon name="lucide:badge-check" size={32} strokeWidth={3} />
    </main>
  );
}

export default App;
