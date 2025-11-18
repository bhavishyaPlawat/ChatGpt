import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page home">
      <div className="hero">
        <div>
          <h1>Professional ChatGPT Frontend</h1>
          <p className="lead">
            A simple, responsive starter with light & dark theme support. Use
            the links below to sign in or create an account.
          </p>
          <div className="actions">
            <Link to="/login" className="btn-primary">
              Sign in
            </Link>
            <Link to="/register" className="btn-ghost">
              Create account
            </Link>
          </div>
        </div>
        <div
          aria-hidden
          style={{
            minWidth: 200,
            height: 140,
            background:
              "linear-gradient(135deg, rgba(15,98,254,0.12), rgba(102,166,255,0.06))",
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
