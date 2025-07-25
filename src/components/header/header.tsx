'use client';
import styles from "./header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.headerBackground}>
        <div className={styles.topBlock}></div>
        <div className={styles.middleBlock}></div>
        <div className={styles.bottomBlock}></div>
      </div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1 className={styles.titleText}>Lina</h1>
          <h1 className={styles.titleText}>Lane</h1>
        </div>
        <div className={styles.headerImage}>
          lol
        </div>
      </div>
    </>
  );
}