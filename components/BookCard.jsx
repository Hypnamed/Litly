"use client";
import Image from "next/image";

export default function BookCard({ book }) {
  if (!book?.volumeInfo) return null; // bail early

  const { title, authors, imageLinks, description } = book.volumeInfo;

  return (
    <div className="bg-litly-cream border border-litly-beige rounded-xl p-2 shadow hover:shadow-md transition duration-200 ease-in-out flex flex-col h-[450px]">
      {/* Thumbnail of the book */}
      {imageLinks?.thumbnail ? (
        <div className="relative w-full h-80 mb-4 rounded overflow-hidden">
          <Image
            src={imageLinks.thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative w-full h-80 mb-4 rounded overflow-hidden">
          <Image
            src="/placeholder.png"
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Book details */}
      <h3 className="text-xl font-bold text-litly-espresso mb-1">{title}</h3>
      <p className="text-sm text-litly-mocha mb-2">
        {authors ? authors.join(", ") : "Unknown Author"}
      </p>
      <p className="text-sm text-litly-espresso line-clamp-3">
        {description || "No description available."}
      </p>

      {/* Button to view details */}
      <div className="mt-auto pt-4 position-fixed top-0 left-0 right-0">
        <button className="bg-litly-orange text-white rounded hover:bg-[#b96a24] transition w-full font-semibold">
          <a
            href={book.volumeInfo.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-litly-orange text-white px-4 py-2 rounded hover:bg-[#b96a24] transition w-full text-center font-semibold"
          >
            View Details
          </a>
        </button>
      </div>
    </div>
  );
}
