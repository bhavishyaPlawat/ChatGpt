import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          ChatGpt
        </Link>
        <nav className="nav-actions">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
          <Link to="/register" className="nav-link btn-ghost">
            Sign up
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Nav;
