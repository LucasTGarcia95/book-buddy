import { Routes, Route, Navigate } from "react-router-dom";

// Pages (you will create these files)
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

export default function App() {
  return (
    <>
      <Routes>
        {/* Redirect root → /books */}
        <Route path="/" element={<Navigate to="/books" replace />} />

        {/* All books */}
        <Route path="/books" element={<BookList />} />

        {/* Single book */}
        <Route path="/books/:id" element={<BookDetails />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Account */}
        <Route path="/account" element={<Account />} />

        {/* Catch-all */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}
