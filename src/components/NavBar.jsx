import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/books" style={{ marginRight: "15px" }}>
        Books
      </Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/register" style={{ marginRight: "15px" }}>
            Register
          </Link>
        </>
      )}

      {user && (
        <>
          <Link to="/account" style={{ marginRight: "15px" }}>
            Account
          </Link>
        </>
      )}
    </nav>
  );
}
