'use client';
import styles from "./header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1 className={styles.titleText}>LINA</h1>
          <h1 className={styles.titleText}><strong>LANE</strong></h1>
          <h2 className={styles.subTitle}>AUTHOR</h2>
          <a className={styles.books} href="#books">DISCOVER BOOKS</a>
        </div>
        <div className={styles.headerImage}>

        </div>
      </div>
    </>
  );
}