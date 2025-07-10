"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function BookSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=10&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );
    const data = await res.json();
    setResults(data.items?.filter((b) => b.volumeInfo) || []);
    setLoading(false);
  };

  return (
    <div ref={wrapperRef} className="relative max-w-xl mx-auto mt-10 z-20">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-80 p-2 border border-gray-300 rounded"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(-1); // reset selection
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlightedIndex((prev) => (prev + 1) % results.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                prev === -1
                  ? results.length - 1
                  : (prev - 1 + results.length) % results.length
              );
            } else if (e.key === "Enter" && highlightedIndex >= 0) {
              e.preventDefault();
              const selectedBook = results[highlightedIndex];
              if (selectedBook?.volumeInfo?.infoLink) {
                window.open(selectedBook.volumeInfo.infoLink, "_blank");
              }
            }
          }}
        />

        <button
          type="submit"
          className="bg-litly-orange text-white px-10 py-2 rounded font-semibold"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-litly-beige rounded shadow-lg max-h-80 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="text-litly-mocha text-sm">Search results</span>
            <button
              onClick={() => setResults([])}
              className="text-litly-espresso hover:text-litly-orange text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {results.map((book) => (
            <a
              key={book.id}
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start px-4 py-3 hover:bg-litly-beige transition text-sm text-litly-espresso gap-3 border-b last:border-none"
            >
              {/* Book Thumbnail */}
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden shadow">
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-16 bg-litly-beige text-xs text-center text-litly-mocha flex items-center justify-center rounded">
                  No Image
                </div>
              )}

              {/* Book Text Info */}
              <div className="flex flex-col">
                <span className="font-semibold">{book.volumeInfo.title}</span>
                <span className="text-xs text-litly-mocha">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
