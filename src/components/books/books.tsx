"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch("/books/books.json");
        const data: Book[] = await res.json();
        setBooks(data);
        setFilteredBooks(data);

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

  // Fuzzy search engine
  const fuse = useMemo(() => {
    return new Fuse(books, {
      keys: ["title", "description", "tags", "details.longDescription"],
      threshold: 0.3,
    });
  }, [books]);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const parseDate = (dateStr?: string) => {
    if (!dateStr) return 0;
    const parts = dateStr.trim().split(/[-./]/).map((p) => p.trim());
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        const [y, m, d] = parts;
        const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
        return isNaN(t) ? 0 : t;
      } else {
        const [d, m, y] = parts;
        const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
        return isNaN(t) ? 0 : t;
      }
    }
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const applyFilters = (base: Book[]) => {
    let result = [...base];

    if (filter === "Newest") {
      result.sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate));
    } else if (filter === "Oldest") {
      result.sort((a, b) => parseDate(a.releaseDate) - parseDate(b.releaseDate));
    } else if (allTags.includes(filter)) {
      result = result.filter((book) => (book.tags ?? []).includes(filter));
    }

    return result;
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(applyFilters(books));
    } else {
      const searchResults = fuse.search(searchQuery).map((res) => res.item);
      setFilteredBooks(applyFilters(searchResults));
    }
  }, [searchQuery, filter, books, fuse]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.books} id="books">
      <div className={styles.title}>
        <h1 className={styles.titleText}>
          <strong>BOOKS</strong>
        </h1>
      </div>

      <div className={styles.filterContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the entire library..."
          className={styles.searchInput}
        />
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
