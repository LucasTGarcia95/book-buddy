import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
        const result = await response.json();
        setBooks(result);
      } catch (err) {
        setError("Failed to load books");
      }
    }

    fetchBooks();
  }, []);

  if (error) return <p>{error}</p>;
  if (!books.length) return <p>Loading books...</p>;

  return (
    <div>
      <h1>Library Catalog</h1>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.title} — {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
