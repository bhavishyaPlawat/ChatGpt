import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with real submit logic
    console.log("Register submitted:", form);
    alert("Register submitted (check console)");
  };

  return (
    <div className="page register">
      <div className="form-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label className="label">Full name</label>
          <div className="input-row">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="input"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="input"
            />
          </div>

          <label className="label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            className="input"
          />

          <label className="label">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="input"
          />

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
        <p
          style={{
            marginTop: 12,
            textAlign: "center",
            color: "var(--muted)",
            fontSize: 13,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--primary)", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
