import { Monicon } from "@monicon/react";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <main className={styles.container}>
      <Monicon name="mdi:home" />
      <Monicon name="logos:active-campaign" size={30} />
      <Monicon name="logos:apache-superset-icon" />
    </main>
  );
}
