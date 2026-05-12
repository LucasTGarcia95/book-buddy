import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Account() {
  const { user, token, logout } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Failed to load reservations");
          return;
        }

        setReservations(result);
      } catch (err) {
        setError("Something went wrong loading reservations");
      }
    }

    if (token) {
      fetchReservations();
    }
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Failed to return book");
        return;
      }

      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError("Something went wrong returning the book");
    }
  }

  if (!user) return <p>Loading account...</p>;

  return (
    <div>
      <h1>Your Account</h1>

      <p>
        <strong>Name:</strong> {user.firstname} {user.lastname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button onClick={logout}>Log Out</button>

      <h2>Your Reservations</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {reservations.length === 0 ? (
        <p>You have no active reservations.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              <Link to={`/books/${res.book.id}`}>
                {res.book.title} — {res.book.author}
              </Link>

              <button
                onClick={() => handleReturn(res.id)}
                style={{ marginLeft: "10px" }}
              >
                Return Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
