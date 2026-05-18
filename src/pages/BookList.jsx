import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="book-list-page">
      <input
        type="text"
        className="book-search"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            {book.coverimage && (
              <img
                src={book.coverimage}
                alt={book.title}
                className="book-card-cover"
              />
            )}

            <div className="book-card-info">
              <h3 className="book-card-title">{book.title}</h3>
              <p className="book-card-author">{book.author}</p>

              <Link to={`/books/${book.id}`} className="book-card-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
