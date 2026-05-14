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
        placeholder="Search for a book or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-content">
              <h3 className="book-title">{book.title}</h3>

              {book.coverimage && (
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="book-cover"
                />
              )}

              <p className="book-author">{book.author}</p>
            </div>

            <Link to={`/books/${book.id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
