import BookSearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main>
      <header className="flex justify-center">
        <h1 className="text-4xl font-semibold">Welcome to Litly!</h1>
      </header>
      <section className="mt-10">
        <div className="justify-self-center">
          <BookSearchBar />
        </div>
      </section>
    </main>
  );
}
