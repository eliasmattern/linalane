"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./books.module.css";

interface BookDetails {
  longDescription: string
  buyLink?: string
}

interface Book {
  title: string,
  imageUrl: string,
  description: string
  details: BookDetails
}

export default function Books() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([] as Book[]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch("/books/books.json");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  return (
    <div className={styles.books}>
      <div className={styles.title} id="books">
        <h1 className={styles.titleText}>
          <strong>BOOKS</strong>
        </h1>
      </div>

      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonTextSmall}></div>
              </div>
            ))
          : books.map((book, i) => (
              <Link
                key={i}
                href={`/book/${slugify(book.title)}`}
                className={styles.bookCard}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className={styles.bookImage}
                />
                <h2>{book.title}</h2>
                <p>{book.description}</p>
              </Link>
            ))}
      </div>
    </div>
  );
}
