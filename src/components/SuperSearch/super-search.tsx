"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";

interface Book {
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  books: Book[];
}

export default function SuperSearch({ books }: Props) {
  const [query, setQuery] = useState("");

  // Configure Fuse.js for fuzzy + typo-tolerant search
  const fuse = useMemo(() => {
    return new Fuse(books, {
      keys: ["title", "description", "tags"],
      threshold: 0.3, // lower = stricter, higher = fuzzier
      includeMatches: true,
    });
  }, [books]);

  const results = query
    ? fuse.search(query).map((res) => res.item)
    : books.slice(0, 5); // show top 5 if no query

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the entire universe of books..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-lg shadow-lg"
        />
        <span className="absolute right-3 top-3 text-gray-400">🔍</span>
      </div>

      {/* Results */}
      {query && (
        <div className="mt-3 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-4 space-y-2 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((book, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-gray-900 hover:bg-purple-800/40 transition cursor-pointer"
              >
                <h3 className="font-semibold text-white">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {book.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-lg bg-purple-600 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No results found...</p>
          )}
        </div>
      )}
    </div>
  );
}
