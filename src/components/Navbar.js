import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">HealthLink</h2>

        <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/departments" onClick={() => setMenuOpen(false)}>Departments</Link></li>
          <li><Link to="/locations" onClick={() => setMenuOpen(false)}>Locations</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/feedback" onClick={() => setMenuOpen(false)}>Feedback & Contact</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/forgot-password" onClick={() => setMenuOpen(false)}>Forgot Password</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
