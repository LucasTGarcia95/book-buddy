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
    <div className="account-page">
      <div className="account-card">
        <h1 className="account-title">Your Account</h1>

        <div className="account-info">
          <p>
            <strong>Name:</strong> {user.firstname} {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <button onClick={logout} className="wax-button">
          Log Out
        </button>

        <h2 className="account-subtitle">Your Reservations</h2>

        {error && <p className="account-error">{error}</p>}

        {reservations.length === 0 ? (
          <p className="account-empty">You have no active reservations.</p>
        ) : (
          <ul className="reservation-list">
            {reservations.map((res) => (
              <li key={res.id} className="reservation-item">
                <div className="reservation-left">
                  <img
                    src={res.coverimage}
                    alt={res.title}
                    className="reservation-thumb"
                  />

                  <Link
                    to={`/books/${res.bookid}`}
                    className="reservation-link"
                  >
                    {res.title} — {res.author}
                  </Link>
                </div>

                <button
                  onClick={() => handleReturn(res.id)}
                  className="wax-button small-wax"
                >
                  Return Book
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
