'use client';
import styles from "./header.module.css";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const handleWheel = (event) => {
      if (window.scrollY === 0 && event.deltaY > 0) {
        event.preventDefault();
        const booksSection = document.querySelector("#books");
        if (booksSection) {
          booksSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  
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