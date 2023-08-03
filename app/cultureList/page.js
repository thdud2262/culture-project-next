import React from "react";
import CultureList from "./CultureList";
import styles from "./cultureList.module.css";

export default function cultureList() {
  return (
    <div className={styles.container}>
      <CultureList />
    </div>
  );
}
