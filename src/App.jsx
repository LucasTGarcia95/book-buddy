import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/account" element={<Account />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
