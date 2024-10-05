import { Iconify } from "@monicon/react";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <main className={styles.container}>
      <Iconify name="mdi:home" />
      <Iconify name="logos:active-campaign" size={30} />
      <Iconify name="logos:apache-superset-icon" />
    </main>
  );
}
