import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [reserveError, setReserveError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
        );
        const result = await response.json();
        setBook(result);
      } catch (err) {
        setError("Failed to load book details");
      }
    }

    fetchBook();
  }, [id]);

  async function handleReserve() {
    setReserveError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: id }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setReserveError(result.message || "Could not reserve book");
        return;
      }

      setSuccess("Book reserved successfully!");

      setBook({ ...book, available: false });
    } catch (err) {
      setReserveError("Something went wrong reserving the book");
    }
  }

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading book...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <h3>by {book.author}</h3>

      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={book.title}
          style={{ width: "200px", borderRadius: "8px" }}
        />
      )}

      <p>{book.description}</p>

      {/* Reserve Button */}
      {token ? (
        <button onClick={handleReserve} disabled={!book.available}>
          {book.available ? "Reserve Book" : "Already Reserved"}
        </button>
      ) : (
        <p>You must be logged in to reserve this book.</p>
      )}

      {reserveError && <p style={{ color: "red" }}>{reserveError}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
