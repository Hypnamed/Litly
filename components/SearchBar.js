"use client";
import Image from "next/image";
import { useState } from "react";

export default function BookSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border border-secondary w-60 h-10 bg-accent rounded-md focus:outline-none"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-litly-orange text-white font-semibold px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.slice(0, 5).map((book) => (
            <div
              key={book.id}
              className="p-4 border border-gray-200 rounded shadow-sm flex space-x-4"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  width="500"
                  height="500"
                  className="w-20 h-auto"
                />
              )}
              <div>
                <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
