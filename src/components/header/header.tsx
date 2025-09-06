'use client';
import styles from "./header.module.css";
import { useEffect } from "react";
import Link from "next/link";

interface FeaturedBook { name: string, imageUrl: string }

interface PageProps {
  featuredBook: FeaturedBook
}

export default function Header({ featuredBook }: PageProps) {
  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.scrollY === 0 && event.deltaY > 0) {
        event.preventDefault();
        const booksSection = document.querySelector("#books");
        if (booksSection) {
      booksSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.titleText}>LINA</h1>
        <h1 className={styles.titleText}><strong>LANE</strong></h1>
        <h2 className={styles.subTitle}>AUTHOR</h2>
        <a className={styles.books} href="#books">DISCOVER BOOKS</a>
      </div>

      {featuredBook && (
        <div className={styles.featuredBook}>
          <Link href={`/book/${slugify(featuredBook.name)}`}>
            <img
              className={styles.featuredImage}
              src={featuredBook.imageUrl}
              alt={featuredBook.name}
            />
          </Link>
          <span className={styles.featuredText}></span>
        </div>
      )}
    </div>
  );
}
