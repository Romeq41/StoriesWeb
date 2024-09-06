import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase-config.js";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import "./AdminAuth.css";
import Footer from "../Footer/Footer.jsx";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <div className="admin-container">
        <button onClick={handleRedirect} id="homepageButton">
          Go to Homepage
        </button>
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className={error ? "error-input" : ""}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                className={error ? "error-input" : ""}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        ) : (
          <AdminDashboard />
        )}
      </div>
      <Footer />
    </>
  );
}
