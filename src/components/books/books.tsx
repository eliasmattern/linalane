"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./books.module.css";

interface BookDetails {
  longDescription: string;
  buyLink?: string | null;
}

interface Book {
  title: string;
  imageUrl: string;
  description: string;
  releaseDate?: string;
  tags?: string[];
  details: BookDetails;
}

export default function Books() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([] as Book[]);
  const [filteredBooks, setFilteredBooks] = useState([] as Book[]);
  const [filter, setFilter] = useState("Recommended");
  const [allTags, setAllTags] = useState([] as string[]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch("/books/books.json");
        const data: Book[] = await res.json();
        setBooks(data);
        setFilteredBooks(data);

        // Extract unique tags (safe if some books have no tags)
        const tagsSet = new Set<string>();
        data.forEach((book) =>
          (book.tags ?? []).forEach((tag) => tagsSet.add(tag.trim()))
        );
        setAllTags(Array.from(tagsSet));
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  // Robust date parser for formats like "dd.mm.yyyy", "dd/mm/yyyy", "yyyy-mm-dd", etc.
  const parseDate = (dateStr?: string) => {
    if (!dateStr) return 0;
    const parts = dateStr.trim().split(/[-./]/).map((p) => p.trim());
    if (parts.length === 3) {
      // If first part has 4 digits, assume yyyy-mm-dd
      if (parts[0].length === 4) {
        const [y, m, d] = parts;
        const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
        return isNaN(t) ? 0 : t;
      } else {
        // assume dd-mm-yyyy
        const [d, m, y] = parts;
        const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
        return isNaN(t) ? 0 : t;
      }
    }
    // fallback to Date.parse for other formats
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);

    // Base array to operate on is the original books array so "Recommended" restores original order.
    if (value === "Recommended") {
      setFilteredBooks(books);
      return;
    }

    if (value === "Newest") {
      const sorted = [...books].sort(
        (a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate)
      );
      setFilteredBooks(sorted);
      return;
    }

    if (value === "Oldest") {
      const sorted = [...books].sort(
        (a, b) => parseDate(a.releaseDate) - parseDate(b.releaseDate)
      );
      setFilteredBooks(sorted);
      return;
    }

    // If the value is one of the tags, filter by that tag (maintains original order)
    if (allTags.includes(value)) {
      setFilteredBooks(books.filter((book) => (book.tags ?? []).includes(value)));
      return;
    }

    // Fallback - show all
    setFilteredBooks(books);
  };

  return (
    <div className={styles.books} id="books">
      <div className={styles.title}>
        <h1 className={styles.titleText}>
          <strong>BOOKS</strong>
        </h1>
      </div>
      <div className={styles.filterContainer}>
        <select value={filter} onChange={handleFilterChange} className={styles.filterSelect}>
          <option value="Recommended">Recommended</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
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
          : filteredBooks.map((book, i) => (
            <Link key={i} href={`/book/${slugify(book.title)}`} className={styles.bookCard}>
              <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
              <h2>{book.title}</h2>
              <p>{book.description}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
