export default async function fetchBooksForKeyword(keyword) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      keyword
    )}&maxResults=10&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  );

  const data = await res.json();

  return data.items?.filter((b) => b.volumeInfo) || [];
}
