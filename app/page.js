import BookCard from "@/components/BookCard";
import fetchBooksForKeyword from "@/components/fetchBooksForKeyword";
import BookSearchBar from "@/components/SearchBar";

export default async function Home() {
  const keywords = [
    "action",
    "crime",
    "distopia",
    "utopia",
    "science",
    "fiction",
    "fantasy",
    "love",
    "dream",
    "religion",
    "success",
  ];
  const allBooks = [];

  for (const word of keywords) {
    const books = await fetchBooksForKeyword(word);
    allBooks.push(...books);
  }

  const randomBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 14);
  return (
    <main>
      <header className="flex justify-center">
        <h1 className="text-4xl font-semibold">Welcome to Litly!</h1>
      </header>
      <section>
        <div className="justify-self-center mt-2">
          <BookSearchBar />
        </div>
        <h1 className="text-3xl font-bold my-4">Discover Random Reads 📚</h1>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-x-4 gap-y-6 mx-2">
          {randomBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
